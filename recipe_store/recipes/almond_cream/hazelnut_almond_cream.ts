import { Recipe, Unit } from '../../types'

const HAZELNUT_ALMOND_CREAM: Recipe = {
	id: "HAZELNUT_ALMOND_CREAM",
	title: "Hazelnut Almond Cream",
	label: "hazelnut almond cream",
	ingredients: [
		{ qty: 25, unit: Unit.Gram, name: "hazelnuts" }, 
		{ qty: 25, unit: Unit.Gram, name: "almond_flour" }, 
		{ qty: 50, unit: Unit.Gram, name: "unsalted_butter", note: "at room temperature" },
		{ qty: 50, unit: Unit.Gram, name: "icing_sugar" },
		{ qty: 1, unit: Unit.Whole, name: "egg" },
		{ qty: 5, unit: Unit.Gram, name: "cornstarch" }],
	directions: [
		"Preheat the oven to 140CFan/150C/300F", 
		"Put the hazelnuts in a blender and blend until finely ground", 
		"Sprinkle the almond flour on a baking sheet, roast for 10 mins in the oven and set aside to cool", 
		"Stir the butter with a spatula until smooth and creamy", 
		"Add the almond flour, icing sugar, and ground hazelnuts and stir until you have a smooth mixture", 
		"Finally, beat in the egg and the cornstarch with a whisk"
	],
	notes: ["Consider using a food processor not the blender"]
};

export default HAZELNUT_ALMOND_CREAM;