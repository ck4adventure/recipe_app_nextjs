# Chefs App for Labeling
# Migrated to [GitHub Issues](https://github.com/ck4adventure/recipe_app_nextjs/issues) on Apr 25th, 2025

Goal is to have Products, Recipes, and Ingrs. Product Labels can be created by looking up first a products recipes, then aggregating all the ingrs of each recipe, incl set of allergens

## Upcoming
### Recipe Card background
- option to change the recipe card background to a look like real paper with cooking stains from use


### Add copy button for labels
Every time there is a label or allergen label, should be a copy button to copy the string to the clipboard for use elsewhere

### Add/Edit ingredient forms
- eventually I'll need to add more ingredients or update the ones I have

### Edit/Delete recipe form
- allow editing of recipe fields, incl ingredients
- make sure to update joins table for recipe_ingrs on recipe.ingrs update

### Delete recipe
- button with confirmation modal to delete a recipe
- I might make this a flag and always filter on it, so that I don't actually lose data
- or keep it manual 

### Ingredient pricing and recipe costing
- New tables to track purchases of ingrs
- Purchases result in a price per unit
- Table with running average that updates with each purchase
- Recipe can then get a cost based on ingrs and quantities used
- Product can get a cost based on recipes used and portions

### Profit tracking
- Enter in a price per unit of product sold, and how many sold
- not sure exactly what to do with this other than calc max profit per day / event
- or profit per order (excludes packaging)




## In Progress

### Add allergens details to recipe item page
- additional query around ingrs for the recipe to get uniq list of allergens



## Finished Tasks/Features

### UI Updates
UI updates to display all relevant information

### Feature: Product (has many recipes)
`/chef/products`, `/chef/products/[slug]`

The primary goal of this feature is to enable querying a Product through its recipes to ingredients and generate an ingredient and allergen list for it so that I can more easily print labels. 
Eventually, I'd like to be able to work with recipe quantities, ingredient cost and product price to keep an eye on profit margins, especially with the rising cost of commerce at the moment.

```json
const blueberry_muffin: Product = {
	"id": "blueberry_muffin",
	"label": "Blueberry Muffin Tart",
	"description": "Almond almond cream and homemade blueberry jam with a vanilla crumble combine for the ultimate blueberry muffin flavor",
	"price": 4.0,
	"unit": "each",
	"ingredients": {
		"base": ["TART_CASE"],
		"filling": ["ALMOND_CREAM", "BLUEBERRY_JAM"],
		"topping": ["VANILLA_CRUMBLE"]
	}
}
```

SCHEMAS

Product Table
- id 
- name (for printing on the label)
- slug (for links)
- description (opt)
- category (from folder name ie tarts)
- components[]
- assembly[]
- notes[]

Product Recipe Table
- id
- productID
- recipeID
- component (layer): [base, filling, topping]


### Add breadcrumbs
Everything under `/chefs` will have breadcrumb links at the top of the page

### Add testing
Basic Levels of Testing

Unit: 
- Mocha to test db schema/migrations for tables, properties, indexes, runs against local

Integration:
- Jest, things like utils and components
- Module Interaction, next server actions like createNewRecipe, which runs db calls and then redirects

E2E:
- Cypress for checking that each page loads and has specified content

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

