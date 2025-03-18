import { Product } from '../../types'
const chocolate_chip_cookie: Product = {
	id: "choco_chip_cookies",
	label: "Chocolate Chip Cookie",
	description: "Large chewy chocolate chip cookie.",
	ingredients: {
		base: ["CHOCO_CHIP_COOKIE"],
		filling: [],
		topping: []
	},
	price: 2.5
}

export default chocolate_chip_cookie;