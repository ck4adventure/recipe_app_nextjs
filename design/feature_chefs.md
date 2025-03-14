# Bakery Manager for Labeling
Goal is to have Products, Recipes, and Ingrs. Product Labels can be created by looking up first a products recipes, then aggregating all the ingrs of each recipe, incl set of allergens

## Upcoming
### Add allergens details to recipe item page
- additional query around ignrs for the recipe to get uniq list of allergens

### Edit recipe form
- allow editing of recipe fields, incl ingredients
- make sure to update joins table for recipe_ingrs on recipe.ingrs update

### Delete recipe
- button with confirmation modal to delete a recipe
- I might make this a flag and always filter on it, so that I don't actually lose data
- or keep it manual 

### Feature: Product (has many recipes)
SCHEMA
title
label
description (opt)
recipes[]
allergens[]
steps[] (opt)
notes[] (opt)

## In Progress
### Add testing
Levels of Testing:
  - test db schema/migrations for tables, properties, indexes, runs against local, jest?
	- mock db and test next actions, which are my db queries, jest
	- any utils that I use, jest
	- should have a list of expected routes/pages, and just ensure each comes back as 200, cypress/jest?
	- finally, clicking through each page to get min expected content, cypress


## Finished Tasks/Features
### Add Form for Recipes
`/chef/recipes/new`

- title
- label
- slug (generated from title, readonly)
- category
- ingredients (queried on joins)
- steps
- notes

### A Recipe has Complex Ingredients
When creating a recipe:
I will type in the amount to measure
I will select the unit of measurement from the list
I want to start typing and select the food from the list

This becomes a recipe_ingredient

CATCH: if recipe updated with a new/existing recipeIngr entry
script would need to query for all entries for that recipeID
then accumulate info and re-write the ingr entry

PAGES
`/chef`, overview page with links
`/chef/ingredients`, index listing all current ingrs
`/chef/ingredients/[slug]`, item page for an ingredient
`/chef/recipes`, index list all recipes by category
`/chef/recipes/[slug]`, item page showing details of a recipe 

SCHEMA
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

