// Client and partner logos, in the order they appear on the current site.

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
];

export const partners: Logo[] = [
	{ name: 'X2 Elite', image: x2Elite },
	{ name: 'ATADM', image: atadm },
];
