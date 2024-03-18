# Recipe Manager App

## Getting Started
- clone the repo
- ensure Node 20
- `npm run install`
- TODO: how to create, migrate and seed db
- and/or create a DEMO flag that allows FE to display sample data
- `npm run dev`

Visit `localhost:3000/recipes` to go to the recipe app main page.

## Current Schema/Stories
As a user I want to view all available recipes.  
As a user I want to view recipes by their category (ie find breakfast recipes).  
As a user I want to add new recipes with one or more categories.  
As a user I want to delete recipes.  

### FE
- `/recipes` - Main homepage for recipes section
- `/recipes/[slug]` - unique slugs to provide human readable url (helpful in bookmarks, autofills)
- `/recipes/add-recipe` - create form for new recipes
- `/recipes/[slug]/edit`
- `/recipes/search `


## Backend
Postgresql DB by `pg` aka postgres node

### Schemas
Categories
- name
- has many recipes through recipe_categories

Recipes
- title
- belongs to many categories through recipe_categories

Recipe Categories
- FK recipe id
- FK category id

### DB Instance
Currently hooking into my local postgres using a `practice` db with no authentication. 
TODO: create a script similar to rails that actually creates the db by name and setting valid credentials.  

`node ./scripts/migrate.js` will create the tables, associations and db level validations.  

`node ./scripts/seed.js` will seed the db with a few sample recipe titles.  

`node ./scripts/drop.js` will drop all tables and data. 

## App Structure
This is a next.js app, following the bleeding-edge `app` server functionality over the old `pages` logic. 
```
/cypress is the e2e testing suite
/db holds db logic
  /seeds is sample data for easier dev
  /migrations holds sql migration files (up only)
  /test to hold mocha/chai db tests
/public
/scripts
/src/app
  /recipes
