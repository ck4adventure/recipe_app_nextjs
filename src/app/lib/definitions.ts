export interface Recipe {
  recipe_id: number;
  recipe_title: string;
	category_id?: number;
	category_name?: string;
}

export interface Category {
	id: number;
	name: string;
}