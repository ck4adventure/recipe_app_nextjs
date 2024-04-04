export interface Recipe {
  recipe_id: number;
  recipe_title: string;
	category_id?: number;
	category_name?: string;
	source_id?: number;
	source_title?: string;
	author_id?: number;
	author_name?: string;
	ingredients?: string[];
	steps?: string[];
}

export interface Category {
	id: number;
	name: string;
}