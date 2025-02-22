import { Recipe, Unit } from "../../types";
const PISTACHIO_PASTE = {
	id: "PISTACHIO_PASTE",
	title: "Pistachio Paste",
	label: "pistachio paste",
	ingredients: [
		{ qty: 250,
			unit: "gram",
			name: "unsalted-pistachios"
		},
		{
			qty: 50,
			unit: "milliliter",
			name: "water",
		},
		{
			qty: 100,
			unit: "gram",
			name: "ch-caster-sugar"
		},
		{
			qty: 60,
			unit: "gram",
			name: "almond-flour"
		},
		{
			qty: 1,
			unit: "Tablespoon",
			name: "sunflower-oil"
		}
	],
	directions: [
		"Preheat the oven to 140CFan/150C/300F",
		"Roast the pistachios for 12 minutes in the preheated oven",
		"Add the water and the caster sugar to a small saucepan",
		"With the help of a sugar thermometer, boil the sugar syrup to a temperature of 243F",
		"Add the warm pistachios and stir will until the nuts are completely coated with syrup",
		"Spread the sugared (not caramelized) pistachios on a baking sheet",
		"Then add them to a blender together with the almond flour",
		"Switch on the blender and after 2 minutes add the sunflower oil",
		"Continue mixing the pistachios for about 10 minutes until you have a smooth paste like peanut butter. Make sure you switch off the blender every so often to prevent the motor from overheating",
	],
	notes: [
		"To enhance the pistachio flavor even further, add a drop of almond extract",
		"The paste can be stored in a jar for up to 3 months without refrigeration"
	]
};

export default PISTACHIO_PASTE;