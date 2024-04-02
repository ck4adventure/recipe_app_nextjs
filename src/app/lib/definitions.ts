export interface Recipe {
  recipe_id: number;
  recipe_title: string;
	category_id?: number;
	category_name?: string;
	ingredients?: string[];
	steps?: string[];
	authors?: string[];
	author_ids?: number[];
	source_id?: number;
	source_title?: string;
}

export interface Category {
	id: number;
	name: string;
}