export enum FlourBlend {
	White = "white",
	Cottage = "cottage",
	Wheat = "wheat",
	Rye = "rye",
	Complet = "complet",
	Integraal = "integraal"
}

export interface LeavenFormData {
	id?: number;
  water_amt: number;
  water_temp: number;
  starter_amt: number;
  flour_amt: number;
  start_time: string;
  start_temp: number;
  end_time?: string; // Optional if not always provided
  end_temp?: number; // Optional if not always provided
}

export interface DoughFormData {
  water_amt: number;
  water_temp: number;
  leaven_amt: number;
	leaven_id?: number;
  flour_amt: number;
	flour_blend: string;
	start_time: string;
	start_temp?: number;
}

export interface Recipe {
  recipe_id: number;
  recipe_title: string;
	recipe_slug: string;
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