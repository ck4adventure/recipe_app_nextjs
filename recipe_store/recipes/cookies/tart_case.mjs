import { Recipe, Unit } from "../../types";
const TART_CASE = {
	id: "TART_CASE",
	title: "Tart Case",
	label: "tart case",
	author: "Maike",
	source: "Petit Gateau",
	ingredients: [
		{ qty: 240, unit: "gram", name: "ap-flour" },
		{ qty: 40, unit: "gram", name: "almond-flour" },
		{ qty: 100, unit: "gram", name: "ch-icing-sugar" },
		{ qty: 4, unit: "gram", name: "kosher-salt" },
		{ qty: 150, unit: "gram", name: "plugra-euro-unsalted-butter" },
		{ qty: 1, unit: "whole", name: "egg" }
	],
	directions: [
		"Add the flour, icing sugar, almond flour and salt to a bowl",
		"Break the cold butter into little pieces and add to the dry ingredients",
		"Mix the butter and the dry ingredients together with your fingers until you have a crumbly dough",
		"Beat the egg",
		"Add about three-quarters of the egg to the dough and start mixing it in. Add the rest of the egg as needed until it just comes together",
		"Wrap the ball of dough in cling film and place in the refrigerator for 1 hr",
		"Take the dough from the fridge and knead it again for a minute or two",
		"Sprinkle the work surface and rolling pin with a little flour",
		"Flatten the ball of dough and roll it out evenly until about 3mm thick, chill for about 20 mins or until stiff again",
		"Remove from fridge, check the thickness rolling as necessary, and cut rounds out of the dough using a pastry cutter",
		"Place each round of dough on a baking ring and press it gently down and against the inside of the ring, chill again until stiff",
		"When ready to use, carefully cut off excess dough around the top of each ring and prick holes in the bottom with a fork",
		"If baking blind, bake at 350F for 12-14 mins or until light golden brown",
	],
	notes: ["For cookies, bake cut discs at 350F for about 8 mins or until light golden brown"]
};

export default TART_CASE;