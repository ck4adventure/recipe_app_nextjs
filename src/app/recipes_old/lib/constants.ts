type BakingUnitsType = {
	g: string;
	ml: string;
	cup: string;
	tbsp: string;
	tsp: string;
	oz: string;
	lb: string;
	piece: string;
	kg: string;
	pinch: string;
	ounce: string;
	whole: string;
	[key: string]: string;
}

export const BakingUnits: BakingUnitsType = {
	'g': 'g',
	'ml': 'ml',
	'cup': 'cup',
	'tbsp': 'tbsp',
	'tsp': 'tsp',
	'oz': 'liquid oz',
	'lb': 'lb',
	'piece': 'piece',
	'kg': 'kg',
	'pinch': 'pinch',
	'ounce': 'ounce (weight)',
	'whole': 'whole',
};
