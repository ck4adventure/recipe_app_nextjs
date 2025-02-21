import { Recipe, Unit } from '../../types'

const ALMOND_CREAM: Recipe = {
	id: "ALMOND_CREAM",
	title: "Almond Cream",
	label: "almond cream",
	ingredients: [
		{ qty: 50, unit: Unit.Gram, name: "almond_flour" },
		{ qty: 0.5, unit: Unit.Whole, name: "vanilla_pod" },
		{ qty: 50, unit: Unit.Gram, name: "unsalted_butter", note: "at room temperature" },
		{ qty: 50, unit: Unit.Gram, name: "icing_sugar" },
		{ qty: 1, unit: Unit.Whole, name: "egg" },
		{ qty: 5, unit: Unit.Gram, name: "cornstarch" }
	],
	directions: [
		"Preheat the oven to 140CFan/150C/300F",
		"Sprinkle the almond flour on a baking sheet, roast for 10 mins in the oven and set aside to cool",
		"Slice the vanilla pod down the middle and use a knife to scrape out the pulp",
		"Stir the butter with a spatula until smooth and creamy",
		"Add the vanilla pulp, icing sugar and almond flour and stir until you have a smooth mixture",
		"Finally, beat in the egg and the cornstarch with a whisk"
	],
	notes: [
		"For an even richer almond flavor, add 25g crumbled amaretto biscuits, a drop of almond extract or a tablespoon of amaretto"
	]
}

export default ALMOND_CREAM;