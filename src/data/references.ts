// Client and partner logos. The clients of the conveyor: those of the current site, in its order,
// then those the client added in a picture of their references (October 2026), in its order.

import type { ImageMetadata } from 'astro';

import jenMaroc from '../assets/clients/jen-maroc.png';
import sonacos from '../assets/clients/sonacos.png';
import alpha55 from '../assets/clients/alpha55.png';
import zineCereales from '../assets/clients/zine-cereales.png';
import indomie from '../assets/clients/indomie.png';
import bicafe from '../assets/clients/bicafe.png';
import alItkane from '../assets/clients/al-itkane.png';
import aswakAssalam from '../assets/clients/aswak-assalam.png';
import systemair from '../assets/clients/systemair.png';
import oncf from '../assets/clients/oncf.png';
import sofa from '../assets/clients/sofa.png';
import canalfood from '../assets/clients/canalfood.png';
import zicaffe from '../assets/clients/zicaffe.png';
// Added at the client's request (October 2026), from a picture of their references: not on the
// current site. Eight are the companies' files, supplied by the client (reference/logos-clients/,
// as they came), trimmed and their white made pure by scripts/make-client-logos.mjs. Three are the companies' own files, kept as they came,
// from Wikimedia Commons: PERI (PERI_Logo_2021.svg, by PERI, public domain), OCP (Ocp-group.png,
// from ocpgroup.ma, public domain), Roca (RocaLogo.svg, the blue logo vectorised by
// Donperfectodewiki, licensed CC BY-SA 3.0: https://commons.wikimedia.org/wiki/File:RocaLogo.svg,
// to be credited). Roca's own site has its logo in black only.
import olandGroup from '../assets/clients/oland-group.png';
import peri from '../assets/clients/peri.svg';
import ines from '../assets/clients/ines.png';
import euroCouleur from '../assets/clients/euro-couleur.png';
import electroTadart from '../assets/clients/electro-tadart.png';
import bmz from '../assets/clients/bmz.png';
import roca from '../assets/clients/roca.svg';
import aphysem from '../assets/clients/aphysem.png';
import pharma5 from '../assets/clients/pharma-5.png';
import ocp from '../assets/clients/ocp.png';
import somapex from '../assets/clients/somapex.png';

import x2Elite from '../assets/partners/x2-elite.png';
import atadm from '../assets/partners/atadm.png';

export interface Logo {
	name: string;
	image: ImageMetadata;
}

export const clients: Logo[] = [
	{ name: 'JEN Maroc', image: jenMaroc },
	{ name: 'Sonacos', image: sonacos },
	{ name: 'Alpha55', image: alpha55 },
	{ name: 'Zine Céréales', image: zineCereales },
	{ name: 'Indomie', image: indomie },
	{ name: 'Bicafé', image: bicafe },
	{ name: 'Al Itkane', image: alItkane },
	{ name: 'Aswak Assalam', image: aswakAssalam },
	{ name: 'Systemair', image: systemair },
	{ name: 'ONCF', image: oncf },
	{ name: 'Sofa', image: sofa },
	{ name: 'Canalfood', image: canalfood },
	{ name: 'Zicaffè', image: zicaffe },
	{ name: 'Oland Group', image: olandGroup },
	{ name: 'PERI', image: peri },
	{ name: 'Ines', image: ines },
	{ name: 'Euro Couleur', image: euroCouleur },
	{ name: 'Electro Tadart', image: electroTadart },
	{ name: 'BMZ', image: bmz },
	{ name: 'Roca', image: roca },
	{ name: 'Aphysem', image: aphysem },
	{ name: 'Pharma 5', image: pharma5 },
	{ name: 'OCP', image: ocp },
	{ name: 'Somapex', image: somapex },
];

export const partners: Logo[] = [
	{ name: 'X2 Elite', image: x2Elite },
	{ name: 'ATADM', image: atadm },
];
