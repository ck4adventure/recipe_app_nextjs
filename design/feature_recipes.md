# Recipes Features
# Migrated to [GitHub Issues](https://github.com/ck4adventure/recipe_app_nextjs/issues) on Apr 25th, 2025

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


### Vercel Postgres
Grrrr. That was a mess until I finally read the error message to the end to see that it was wanting a `POSTGRES_URL` and not the `PG_URL` as given to me by both the UI and CLI `vercel env pull` command. But in the end I have my postico connection, psql if I need it and my scripts to run for seeding.

### Recipe has a Source
I get recipes from books.
I get recipes from the internet.
I get recipes from friends / random one-offs.

#### BE
An author has a name and is_profi? t/f
A source has a type, title, and optional source_url.
A recipe has only one source.
A recipe has only one author. (if multiple needed can switch to joins)
A source has one or more authors through its recipes.
A source has many recipes (through recipes).
An author has many recipes (through recipes).


Author
- name: prolly do first and last fields and do a virtual full name
- is_profi: bool, opt, default true

Source
- source_type: personal collection, book, or website
- title: required if book or site, "[first_name]'s Personal Collection" if personal collection
- source_url: required if site

Category
- name and slug

Recipe
- title and slug
- source_id
- author_id (cuz sources can be aggregates like gbbo.com)
- category_id 


#### FE
Add Recipe Form - DELETED FOR NOW
- updates to choose Author from a select menu
	- if need to add new Author, that will be done somewhere else
- once Author selected, runs a query to load Author's sources
  - sources are also a select menu, adding sources will be done somewhere else
- I think it is possible to build a react component that could handle the author/source crud alongside the select, but will keep it simple for now

Recipe Detail Page
  - should show source information if present

Author Detail Page
  - shows full name
	- sites section with list of sites, then by category and recipe
	- books section with list of book titles, then by category and recipe
	- OR, could combine both lists and display with RecipeView

Source Detail Page
  - type of source
  - title of source if present
	- url of source if present
	- author(s) names
	- RecipeView with list or categories



### Category Index Page
Cards can only show the top 5 recipes fo reach before becoming unwieldy. A category index page should show all the recipes for a category in alphabetical order.
- ROUTE: `/categories/[slug]`
- FE: Create category index page for route
- FE: Index page should show the category name and list of recipes
- ACTION: getRecipeForCategory(cat)


### Display 'Add Recipe' button on every page
DISABLED FOR NOW
Material style round plus sign button that hovers at z+1  
Links to create recipe page.
Don't show on recipe add/edit pages. 
- FE: find an icon that works and create component
- FE: figure out where to put component into pages/layouts to give it a z-index and drop shadow
- FE: link it to the create recipe page

### Recipes Index View All
Toggle buttons to switch between category cards and full list.  
- FE: add component to display as a list, sorted alphabetically

### Edit a Recipe
DISABLED FOR NOW
Editing reuses the recipe form and shows any existing data.  
Recipes should be able to be saved w/o steps or ingredients.  
- ROUTE: `/recipes/[slug]/edit`
- FE: Recipe display page updated with "Update Recipe" link 
- FE: Recipe form updated to take a recipe
- FE: action created to update a recipe and redirect back to its page
- BE: Ensure no cascade deletes if ingrs or steps deleted

### Recipes have Directions/Steps/Method
Directions are a sequence of steps to follow
- FE: Detail page has Directions section, listed in order numerical
- FE: each step is just text for now
- FE: Update fetch and create actions
- FE: update add form to have dynamic steps
- BE: Add recipes steps table
- BE: Update seeds data


### Recipes have Ingredients
- FE: DetailPage gets Ingredients Section, should list them as bullet points
- FE: each ingredient is just a text string for now
- FE: update functions that get or update recipes to include ingredients logic
- FE: update AddRecipeForm to use dynamic form fields
- BE: Add recipe_ingredients table
- ingredient varchar255
- FK recipe_id (r has many i, i belongs to 1 r, unique)
- BE: Update seeds data

### Delete a Recipe
- FE: add a delete button on the detail page
- FE: add a modal to confirm the delete
- Action: delete recipe by slug/id
- BE: Ensure entries in recipe_categories deleted when recipe deleted DONE

### Recipe Links are Slugs not IDs
As a user, I want to see the recipe title in the URL
- ROUTE: `/recipes/[slug]`
- FE: change links to use slugs
- Action: getRecipeBySlug
- BE: add unique to title, add col slug to recipes table, generated from title

### View a Recipe
As a user, I want to be able to view my recipe
- ROUTE: `/recipes/[id]`
- FE: create RecipeDetailPage
- Action: getRecipeByID

### Add a Recipe
As a user, I want to be able to add a recipe
- ROUTE: `/recipes/add-recipe`
- FE: create AddRecipePage with title input and category
- Action: createRecipeWithCategory

### Recipe Categories
As a user, I want to see my recipes grouped by category.
- FE: add category cards to main index page
- FE: add individual category pages to view the entire list
- Action: get recipes and categories
- BE: add categories table
- BE: add recipe_categories joins table

### Recipes Index Page
As a user, I want to see all of my available recipes.
- ROUTE: `/recipes`
- FE: create RecipeIndexPage with a heading and list all recipes by title
- Action: get all recipe titles
- BE: create recipes table with id and title required (no unique)