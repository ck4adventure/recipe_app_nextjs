import { Recipe, Unit } from '../../types'

const COCONUT_ALMOND_CREAM: Recipe = {
	id: "COCONUT_ALMOND_CREAM",
	title: "Coconut Almond Cream",
	label: "coconut almond cream",
	ingredients: [
		{ qty: 50, unit: Unit.Gram, name: "almond_flour" },
		{ qty: 50, unit: Unit.Gram, name: "unsalted_butter", note: "at room temperature" },
		{ qty: 25, unit: Unit.Gram, name: "coconut_flour" },
		{ qty: 50, unit: Unit.Gram, name: "icing_sugar" },
		{ qty: 1, unit: Unit.Whole, name: "egg" },
		{ qty: 5, unit: Unit.Gram, name: "cornstarch" }
	],
	directions: [
		"Preheat the oven to 140CFan/150C/300F",
		"Sprinkle the almond flour on a baking sheet, roast for 10 mins in the oven and set aside to cool",
		"Stir the butter with a spatula until smooth and creamy",
		"Add the almond flour, coconut flour, and icing sugar and stir until you have a smooth mixture",
		"Finally, beat in the egg and the cornstarch with a whisk"
	],
	notes: [
		"For an even richer almond flavor, add 25g crumbled amaretto biscuits, a drop of almond extract or a tablespoon of amaretto"
	]
}

export default COCONUT_ALMOND_CREAM;