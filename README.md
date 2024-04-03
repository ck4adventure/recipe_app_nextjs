# Recipe Manager App

See [features](FEATURES.md)

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
- `/authors`
- `/categories`
- `/recipes` - Main homepage for recipes section
- `/recipes/[slug]` - unique slugs to provide human readable url (helpful in bookmarks, autofills)
- `/sources`


## Backend
Postgresql DB by `pg` aka postgres node


### DB Instance
Currently hooking into my local postgres using a `practice` db with no authentication. 
TODO: create a script similar to rails that actually creates the db by name and setting valid credentials.  

`node ./scripts/migrate.js` will create the tables, associations and db level validations.  

`node ./scripts/seed.js` will seed the db with a few sample recipe titles.  

`node ./scripts/drop.js` will drop all tables and data. 

## App Structure
This is a next.js app, following the bleeding-edge `app` server functionality over the old `pages` logic. 

```
/__test__ is the jest component testing
/cypress is the e2e testing suite for the FE
/db holds db logic
  /seeds is sample data for easier dev
  /migrations holds sql migration files (up only)
/public
/scripts
/src/app
	/authors
	/categories
  /recipes
	/sources
/tests holds the db tests using mocha
```
