export enum Measures {
	Tbsp = "Tbsp",

}

export interface ChefsRecipe {
  id: number;
  title: string;
	label: string;
	category: string;
	slug: string;
	ingredients: string[];
	steps: string[];
	notes?: string[];
}