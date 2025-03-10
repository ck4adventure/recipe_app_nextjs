## In progress

## Bakery Manager for Labeling
Goal is to have Products, Recipes, and Ingrs. Product Labels can be created by looking up first a products recipes, then aggregating all the ingrs of each recipe, incl set of allergens
- ingrs table
  - ingr has brand, name, label name, list of one or more foods/ingrs
	- also has list of allergens
  - if created by a recipe, has recipe_id
- chefs_recipes table
	- has a recipe title
  - has many ingredient instances (qty, measure, ingr)
	- has many steps (text array)
	- has notes
- recipe_ingrs table
  - tracks usage of ingredients per recipe
	- recipe_id
	- ingr_id
	- qty
	- measure
	- note

### Add/Update Form for Recipes
- title
- label
- category
- ingredients (queried on joins)
- steps
- notes

### Complex Ingredients.
When creating a recipe:
I will type in the amount to measure
I will select the unit of measurement from the list
I want to start typing and select the food from the list

This becomes a recipe_ingredient

CATCH: if recipe updated with a new/existing recipeIngr entry
script would need to query for all entries for that recipeID
then accumulate info and re-write the ingr entry

