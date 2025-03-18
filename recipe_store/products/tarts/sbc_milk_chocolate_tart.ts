import { Product } from "../../types";
const milk_choc_sbc: Product = {
	"id": "milk_choc_sbc",
	"label": "Milk Chocolate over Salted Butter Caramel",
	"description": "Creamy milk chocolate over a decadent layer of salted butter caramel. Like a candy bar, but grown up",
	"price": 4.0,
	"unit": "each",
	"ingredients": {
		"base": ["TART_CASE"],
		"filling": ["SALTED_CARAMEL", "MILKCHOC_GANACHE"],
		"topping": []
	}
}

export default milk_choc_sbc;