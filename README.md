# Bakery Management App

See [features](/design/feature_chefs.md) for the latest product status.

Using Next.js with Typescript to learn more and stay sharp.

## Getting Started
- clone the repo
- ensure Node 20 or greater
- `npm run install`
- TODO: set up env file
- TODO: update with how to load local data from scripts
- `npm run dev`

Visit `localhost:3000/recipes` to go to the recipe app main page.

## Backend
Postgresql DB by `pg` aka postgres node. 
There is no ORM because I wanted practice writing sql directly.

Using vercel's Neon service to keep an online db instance. This is slightly impractical as I now maintain two sets of scripts, one for local development using migration files, and the other to update the cloud instance for online deployment.
 
Starting point is the `/scripts` folder with local and vercel scripts.

## App Structure
This is a next.js app, following the bleeding-edge `app` server functionality over the old `pages` logic. 

```
/__test__ is the jest component testing
/cypress is the e2e testing suite for the FE
/data is the personal recipes sample data
/db holds db logic
	/migrations holds sql migration files (up only)
  /tests is where BE testing lives
  /utils for local and vercel drop, migrate and load actions
/design to held feature specs 
/public holds images and other FE assets
/recipe_store is the business recipes sample data
/scripts
/src
  /app
	/components
	/lib
/tests holds the db tests using mocha
```
