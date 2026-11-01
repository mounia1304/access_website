// THE RULES OF THE IMPORT DUTIES SIMULATOR (pages/e-services/simulateur.astro).
//
// Every number the simulator uses is here, and only here: change a rate or an amount and the page
// follows at the next build. The arithmetic that uses them is in utils/simulateur.ts.
//
// They follow the company's own customs rules (the L99 prompt, "PROMPT SYSTÈME.docx", 2026-11-01):
//   R5  — exchange rate: Bank Al-Maghrib's reference rate (1 for an invoice in dirhams);
//   R6  — VED CAF = (net invoice × BAM rate) + freight + insurance + aconage, rounded up to the
//         dirham; EXW / FCA / FAS / FOB: the freight is never estimated, the visitor gives it;
//   R7  — insurance: the amount given, otherwise 0.3 % of (invoice + freight), 3 % for glass;
//   R8/R9 — aconage: the local port charges given, otherwise an estimate of 3 600 MAD;
//   R13 — preferential origin with valid proof: preferential duty, and the saving against the
//         general rate is shown;
//   R14 — TIC: only where the goods are subject to it, added to the VAT base;
//   R15 — DI by tariff; PFI (TPI) 0.25 % of the VED; VAT 20 % (or a specific rate) of
//         VED + DI + PFI + TIC; total duties and taxes = DI + PFI + TIC + VAT.
// The form follows the fields of Mirage's calculator (the client's reference, 2026-11-01).
//
// Amounts in dirhams (MAD), rates as fractions (0.2 is 20 %).

// ── Currencies (R5) ──────────────────────────────────────────────────────────────────────────

/** The currencies offered, and how many dirhams one unit is worth. The visitor gives the exchange
 *  rate in the form: these only fill that field in advance (indicative Bank Al-Maghrib rates of
 *  `ratesDate`; TO UPDATE from time to time). */
export const currencies = {
	EUR: 10.7,
	USD: 9.2,
	CNY: 1.28,
	GBP: 12.3,
	TRY: 0.27,
	AED: 2.5,
	MAD: 1,
} as const satisfies Record<string, number>;

export const ratesDate = '2026-11-01';

export type CurrencyCode = keyof typeof currencies;

// ── Incoterms (R6) ───────────────────────────────────────────────────────────────────────────

/** What the invoice already covers. When it does not cover the freight, the form asks for its
 *  amount (required: R6 never estimates it); when it does not cover the insurance, it asks for its
 *  amount (optional: the R7 flat rate otherwise). `duties`: the seller pays duties and taxes (DDP). */
export const incoterms = {
	EXW: { freight: false, insurance: false, duties: false },
	FCA: { freight: false, insurance: false, duties: false },
	FAS: { freight: false, insurance: false, duties: false },
	FOB: { freight: false, insurance: false, duties: false },
	CFR: { freight: true, insurance: false, duties: false },
	CPT: { freight: true, insurance: false, duties: false },
	CIF: { freight: true, insurance: true, duties: false },
	CIP: { freight: true, insurance: true, duties: false },
	DAP: { freight: true, insurance: true, duties: false },
	DPU: { freight: true, insurance: true, duties: false },
	DDP: { freight: true, insurance: true, duties: true },
} as const satisfies Record<string, { freight: boolean; insurance: boolean; duties: boolean }>;

export type IncotermCode = keyof typeof incoterms;

// ── Insurance (R7) ───────────────────────────────────────────────────────────────────────────

export const insurance = {
	/** Flat rate on (invoice + freight) when no amount is given. */
	rate: 0.003,
	/** For glass and goods made of glass (a box of the form). */
	glassRate: 0.03,
};

// ── Aconage (R8, R9) ─────────────────────────────────────────────────────────────────────────

/** Local port charges included in the VED, when the visitor gives none (R9 estimate). */
export const aconageEstimate = 3600;

// ── Duties and taxes (R13, R15) ──────────────────────────────────────────────────────────────

export const taxes = {
	/** PFI (also called TPI): 0.25 % of the VED. The form lets it be unticked (an agreement that
	 *  removes it). */
	pfiRate: 0.0025,
	/** The VAT rates offered (R15: 20 % unless a specific rate applies). */
	vatRates: [0.2, 0.1, 0] as const,
	/** The preferential duty filled in when the visitor chooses a preferential origin (R13: 0 % in
	 *  the general case for industrial goods under the EU and Turkey agreements). */
	preferentialRate: 0,
};
