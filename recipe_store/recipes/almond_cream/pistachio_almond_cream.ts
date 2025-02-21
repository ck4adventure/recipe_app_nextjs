import { Recipe, Unit } from '../../types'

const PISTACHIO_ALMOND_CREAM: Recipe = {
	id: "PISTACHIO_ALMOND_CREAM",
	title: "Pistachio Almond Cream",
	label: "pistachio almond cream",
	ingredients: [
		{ qty: 50, unit: Unit.Gram, name: "almond_flour" },
		{ qty: 50, unit: Unit.Gram, name: "unsalted_butter", note: "at room temperature" },
		{ qty: 50, unit: Unit.Gram, name: "icing_sugar" },
		{ qty: 1, unit: Unit.Whole, name: "egg" },
		{ qty: 5, unit: Unit.Gram, name: "cornstarch" },
		{ qty: 20, unit: Unit.Gram, name: "PISTACHIO_PASTE", hasRecipe: true },
	],
	directions: [
		"Preheat the oven to 140CFan/150C/300F",
		"Sprinkle the almond flour on a baking sheet, roast for 10 mins in the oven and set aside to cool",
		"Stir the butter with a spatula until smooth and creamy",
		"Add the icing sugar and almond flour and stir until you have a smooth mixture",
		"Beat in the egg and the cornstarch with a whisk",
		"Stir in the pistachio paste"
	],
	notes: [
		"Make sure you have pistachio paste on hand first"
	]
}

export default PISTACHIO_ALMOND_CREAM;