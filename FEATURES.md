
## In progress
### Baking Log
I am learning to bake professional grade bread, and I need to start learning from my timings to achieve a more consistent result.

#### UX
UX v2
While trying to build out the form and data while working with real data from baking during the week, my UX needs revision.
A leaven can be used to make many doughs, as I did today with white and wheat.
A dough is already by default two loaves, but now I already want to make that dynamic like doughs from leaven.
So now I see the need and better simplicity of tracking each of these things as their own Tasks in progress, stored in their own DB. 
I really like the Stepper element in MUI. I want to incorporate that as well.
But first, transition to multiple tables and use the stepper to feed the parent ID of one stage to the next. Each Step below is a table.


Baking Log main page should have a list of past bread bakes and their results
Baking Log page has a button that navigates me to the Create new bake page
The create form has only the first few things to get me started
Basically, I should start a new one as I create my leaven the night before, that's when the clock starts ticking, an entry is made with an ID
Now I can click back into it and continue updating things as I work
Loaf type is decided when I make the dough the next morning or 8 hrs later


#### DATA
Table 1: Leaven
(200/200/1Tbl, more like 30g starter is what I'm using)
Leaven Water Temp
Leaven Water Amount (ml)
Leaven Flour Amount (g) 
Leaven Starter Amount (g)
Leaven Start Time
Leaven Ambient Temp at Start
Leaven End Time
Leaven Ambient Temp at End (traking temp and time til ready)

Table 2: Dough
Loaf Type (flour blend): White (100% White), Cottage (10% Wheat), Rye (13% Rye), Earthy Wheat (50% Wheat), Integraal (100% Wheat), TODO: Custom Percentages / Triple Blends / Mixins
Dough Water Amt in ml
Dough Water Temp in F
Dough Starter Amt in g
Dough Flour Total Amount in g
Dough Hydrolyse Time Start
Dough Hydrolyse Temp Start
Dough Hydrolyse Time End
Dough Hydrolyse Temp End

Table 3: Mix n Prove (could theoretically divide here if needed?, or at 1sst turn?)
Water Amt
Water Temp
Salt Amt
Salted Loaf Time (salt n mix is technically a set of turns?)
Proving Temp Start
Turns: [] TODO: any mixins during the 1st few turns, like sesame
Proving Temp End

Step 4: Bench Rest
Shape and Bench Rest Start Time
Shape and Bench Rest Start Temp
Shape and Bench Rest End Time
Shape and Bench Rest End Temp


Step 5: Shape and Prove
Form into loaves
Number of Loaves

proving start time
Loaf proving Temp

Step 6:
Loaf prove end time/ Baking Start Time
Loaf form
Spray steam? y/n/na
Baking temp
Baking end time


## Upcoming Features
#### Note
Due to wanting to publish this project without auth, removing all db interaction and leaving this as more of a static site with cool react features. Recipes are easily managed as json/yaml files. Later on I will add auth and bring back direct updates.

### Directions have checkmark boxes to keep your place
As a baker, longer recipes often leave me scanning the same paragraphs over and over to find my place. I want a checkbox to the left of each numbered step that when I check it, it grays out the step so I can know to ignore it. The text for a checked step should be grayed out significantly, but still be readable if I need to confirm my work.
There should be a "clear all" box somewhere with a confirmation modal to reset my progress as needed. 

### Convert between Imperial/US/Metric Units
- store recipes in original units of measure (harder, but more accurate)
- if in metric, no real need (for me) to put in imperial
- toggle button to switch between

### Add a recipe from a text file
### Easily Half, Double, Triple... a recipe's quantities
### Cost Calculator
- flour cost per lb (1.30)
- water negligable
- salt negligable
- baking time (gas bill)
### Baking Planner/Scheduler
As a baker, I want to know how long it will take me to get something from start to finish.  
As a baker, I want to know what time it will be done if started at a given time.  
As a baker, I want to know how early I need to start in order to be done by a given time.  

----------------

## Completed Recipes App Features
### Complex Ingredients
Currently, Ingredients are stored as text unique to the recipe.

When creating a recipe:
I will type in the amount to measure
I will select the unit of measurement from the list
I want to start typing and select the food from the list

This becomes a recipe_ingredient

A food has a name (white bread flour, whole wheat flour, granulated sugar)


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