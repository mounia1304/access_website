// The arithmetic of the import duties simulator. It holds no number of its own: rates and amounts
// are the rules of data/simulateur.ts, which follow the company's L99 rules. It runs in the
// visitor's browser (the page's script).
//
//   1. invoice in dirhams = invoice × the exchange rate given (R5; 1 for dirhams);
//   2. freight: the amount given, unless the Incoterm covers it (R6; never estimated);
//   3. insurance: unless the Incoterm covers it, the amount given, otherwise 0.3 % of
//      (invoice + freight), 3 % for glass (R7);
//   4. aconage: the local charges given, otherwise the estimate (R8, R9);
//   5. VED CAF = invoice + freight + insurance + aconage, rounded up to the dirham (R6);
//   6. DI = VED × the tariff's rate, or the preferential rate with proof of origin (R13);
//      PFI = 0.25 % of the VED (unless unticked); TIC and other entry duties as given (R14);
//      VAT = rate × (VED + DI + PFI + TIC + other duties) (R15);
//   7. duties and taxes = DI + PFI + TIC + other duties + VAT; landed cost = VED + duties and taxes.
//   With a preferential origin, the same is worked out at the general rate: the difference is the
//   saving (R13). Each tax is rounded to the dirham.

import { aconageEstimate, incoterms, insurance, taxes, type CurrencyCode, type IncotermCode } from '../data/simulateur';

export interface SimulationInput {
	invoice: number;
	currency: CurrencyCode;
	/** Dirhams for one unit of the currency (ignored for MAD). */
	rate: number;
	incoterm: IncotermCode;
	/** In the invoice's currency, or in dirhams (inMad). Asked only when the Incoterm does not cover it. */
	freight?: { amount: number; inMad: boolean };
	/** Optional, only when the Incoterm does not cover it. */
	insurance?: { amount: number; inMad: boolean };
	/** Glass or goods made of glass: the 3 % flat rate (R7). */
	glass: boolean;
	/** Local port charges, in dirhams; the estimate when not given. */
	aconage?: number;
	/** The tariff line's import duty, as a fraction. */
	dutyRate: number;
	/** Preferential origin with valid proof (R13), and its duty, as a fraction. */
	preferential: boolean;
	preferentialRate: number;
	/** PFI applies (ticked). */
	pfi: boolean;
	/** In dirhams. */
	tic: number;
	otherDuties: number;
	/** As a fraction. */
	vatRate: number;
}

export type InsuranceBasis = 'included' | 'given' | 'rate' | 'glass';

export interface Taxes {
	duty: number;
	pfi: number;
	tic: number;
	otherDuties: number;
	vatBase: number;
	vat: number;
	/** DI + PFI + TIC + other duties + VAT. */
	total: number;
}

export interface SimulationResult extends Taxes {
	goods: number;
	/** null when the invoice covers it. */
	freight: number | null;
	insurance: number | null;
	insuranceBasis: InsuranceBasis;
	aconage: number;
	aconageEstimated: boolean;
	/** Valeur en douane (CAF), rounded up to the dirham. */
	ved: number;
	dutyRate: number;
	/** VED + duties and taxes. */
	landed: number;
	/** With a preferential origin: what the general rate would cost more (R13); otherwise null. */
	saving: number | null;
	exchangeRate: number;
}

/** Reads a figure typed in a plain text field: "12 000", "12000,50", "10.7", "1.234,5". Spaces
 *  separate thousands; the last comma or point is the decimal one, any other is a thousands one.
 *  Anything that is not a figure reads as 0. */
export function parseAmount(text: string): number {
	const compact = text.replace(/[\s  ]/g, '');
	const decimalAt = Math.max(compact.lastIndexOf(','), compact.lastIndexOf('.'));
	const normal =
		decimalAt < 0
			? compact
			: compact.slice(0, decimalAt).replace(/[.,]/g, '') + '.' + compact.slice(decimalAt + 1);
	const value = Number(normal);
	return Number.isFinite(value) && value >= 0 ? value : 0;
}

/** Duties and taxes on a customs value, at a given import duty rate (R15). */
export function taxesOn(ved: number, dutyRate: number, input: SimulationInput): Taxes {
	const duty = Math.round(ved * dutyRate);
	const pfi = input.pfi ? Math.round(ved * taxes.pfiRate) : 0;
	const tic = Math.round(input.tic);
	const otherDuties = Math.round(input.otherDuties);
	const vatBase = ved + duty + pfi + tic + otherDuties;
	const vat = Math.round(vatBase * input.vatRate);
	return { duty, pfi, tic, otherDuties, vatBase, vat, total: duty + pfi + tic + otherDuties + vat };
}

export function simulate(input: SimulationInput): SimulationResult {
	const covers = incoterms[input.incoterm];
	const rate = input.currency === 'MAD' ? 1 : input.rate;
	const toMad = (amount: number, inMad = false) => (inMad ? amount : amount * rate);
	const goods = toMad(input.invoice);

	const freight = covers.freight ? null : toMad(input.freight?.amount ?? 0, input.freight?.inMad);

	let insuranceAmount: number | null = null;
	let insuranceBasis: InsuranceBasis = 'included';
	if (!covers.insurance) {
		if (input.insurance && input.insurance.amount > 0) {
			insuranceAmount = toMad(input.insurance.amount, input.insurance.inMad);
			insuranceBasis = 'given';
		} else {
			insuranceAmount = (input.glass ? insurance.glassRate : insurance.rate) * (goods + (freight ?? 0));
			insuranceBasis = input.glass ? 'glass' : 'rate';
		}
	}

	const aconageEstimated = input.aconage === undefined;
	const aconage = input.aconage ?? aconageEstimate;

	const ved = Math.ceil(goods + (freight ?? 0) + (insuranceAmount ?? 0) + aconage);
	const dutyRate = input.preferential ? input.preferentialRate : input.dutyRate;
	const due = taxesOn(ved, dutyRate, input);
	const saving = input.preferential ? taxesOn(ved, input.dutyRate, input).total - due.total : null;

	return {
		goods,
		freight,
		insurance: insuranceAmount,
		insuranceBasis,
		aconage,
		aconageEstimated,
		ved,
		dutyRate,
		...due,
		landed: ved + due.total,
		saving,
		exchangeRate: rate,
	};
}
