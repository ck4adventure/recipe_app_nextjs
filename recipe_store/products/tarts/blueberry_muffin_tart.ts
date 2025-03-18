import { Product } from "../../types";

const blueberry_muffin: Product = {
	"id": "blueberry_muffin",
	"label": "Blueberry Muffin Tart",
	"description": "Almond almond cream and homemade blueberry jam with a vanilla crumble combine for the ultimate blueberry muffin flavor",
	"price": 4.0,
	"unit": "each",
	"ingredients": {
		"base": ["TART_CASE"],
		"filling": ["ALMOND_CREAM", "BLUEBERRY_JAM"],
		"topping": ["VANILLA_CRUMBLE"]
	}
}

export default blueberry_muffin;