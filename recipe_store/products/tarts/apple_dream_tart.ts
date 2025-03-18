import { Product } from "../../types";

const apple_dream_tart: Product = {
	"id": "apple_dream_tart",
	"label": "Apple Dream Tart",
	"description": "Apple tart enhanced with a layer of almond cream",
	"price": 4.0,
	"unit": "each",
	"ingredients": {
		"base": ["TART_CASE"],
		"filling": ["ALMOND_CREAM", "APPLE_SAUCE", "APPLE_SLICES"],
		"topping": ["APRICOT_JELLY"]
	}
}

export default apple_dream_tart;