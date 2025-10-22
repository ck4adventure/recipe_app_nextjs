export const GENERAL_ALLERGENS = "milk, eggs, tree nuts, peanuts, wheat, soy"

export const SOURCE_TYPES = ["BOOK", "SITE", "PERSONAL", "OTHER"];

// food ingredients contains commonly used listings
export interface Food {
	brand: string;
	name?: string;
	label: string;
	ingredients: string[];
	allergens?: string[];
}

export interface FoodsData {
	[key: string]: Food;
}

// units: g, ml, tsp, Tbsp,
export enum Unit {
	Drop = "drop",
	Gram = "g",
	Milliliter = "ml",
	Liter = "l",
	Teaspoon = "tsp",
	Tablespoon = "Tbsp",
	Whole = "whole",
	Pinch = "pinch",
	Percent = "percent",
	Piece = "piece",
	Cup = "cup",
	Ounce = "ounce"
}


export interface Recipe_Ingredient {
	qty: number;
	unit: Unit;
	name: string;
	note?: string;
	hasRecipe?: boolean;
}

export interface Recipe {
	id: string;
	title: string;
	label: string;
	author?: string;
	ingredients: Recipe_Ingredient[];
	directions: string[];
	notes?: string[];
	source?: string;
}


export interface Product {
	id: string;
	label: string;
	description: string;
	price: number;
	unit?: string;
	ingredients: {
		base: string[],
		filling: string[],
		topping: string[],
	};
}

export interface Products {
	[key: string]: Product;
}
