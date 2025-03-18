import { Product } from "../../types";
const white_chocolate_tart: Product = {
	"id": "white_chocolate_tart",
	"label": "White Chocolate Tart",
	"description": "Sweet white chocolate in a crispy buttery tart case.",
	"price": 4.0,
	"unit": "each",
	"ingredients": {
		"base": ["TART_CASE"],
		"filling": ["WHITECHOC_GANACHE"],
		"topping": []
	}
}

export default white_chocolate_tart;