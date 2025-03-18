import { Product } from "../../types";
const milk_choc_tart: Product = {
	"id": "milk_choc_tart",
	"label": "Milk Chocolate Tart",
	"description": "Sweet milk chocolate ganache.",
	"price": 4.0,
	"unit": "each",
	"ingredients": {
		"base": ["TART_CASE"],
		"filling": ["MILKCHOC_GANACHE"],
		"topping": []
	}
}

export default milk_choc_tart;