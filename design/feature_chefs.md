## In progress
## Bakery Manager for Labeling
Goal is to have Products, Recipes, and Ingrs. Product Labels can be created by looking up first a products recipes, then aggregating all the ingrs of each recipe, incl set of allergens
- ingrs table
  - if created by a recipe, has recipe_id
- chefs_recipes table
  - has many ingredient instances (qty, measure, ingr)
	- has a recipe title
	- has many steps (text array)
- chefs_recipe_ingredients table
  - recipe has many ingredients
	- ingredients used in many recipes
	- has qty and measure also

### Add/Update Form for Recipes
- title
- label
- category
- ingredients (queried on joins)
- steps
- notes