# User Stories
## TODO
### Convert between Imperial/US/Metric Units
- store recipes in original units of measure (harder, but more accurate)
- if in metric, no real need (for me) to put in imperial
- toggle button to switch between


### Category Pages
ROUTE: `/recipes/category/[slug]` or `/category?breads`

### Recipe has a Source
- Author, Book/Website, Page/Link
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

## Recipes Features
### Recipes Index Page
Story: As a user, I want to see all of my available recipes.
ROUTE: `/recipes`
FE: create RecipeIndexPage with a heading and list all recipes by title
Action: get all recipe titles
BE: create recipes table with id and title required (no unique)

### Recipe Categories
Story: As a user, I want to see my recipes grouped by category.
FE: add category cards to main index page
FE: add individual category pages to view the entire list
Action: get recipes and categories
BE: add categories table
BE: add recipe_categories joins table

### Add a Recipe
Story: As a user, I want to be able to add a recipe
FE: create AddRecipePage with title input and category
Action: createRecipeWithCategory

### View a Recipe
Story: As a user, I want to be able to view my recipe
ROUTE: `/recipes/[id]`
FE: create RecipeDetailPage
Action: getRecipeByID

### Recipe Links are Slugs not IDs
Story: As a user, I want to see the recipe title in the URL
ROUTE: `/recipes/[slug]`
FE: change links to use slugs
Action: getRecipeBySlug
BE: add unique to title, add col slug to recipes table, generated from title

### Delete a Recipe
FE: add a delete button on the detail page
FE: add a modal to confirm the delete
Action: delete recipe by slug/id
BE: Ensure entries in recipe_categories deleted when recipe deleted DONE

### Recipes have Ingredients
FE: DetailPage gets Ingredients Section, should list them as bullet points
FE: each ingredient is just a text string for now
FE: update functions that get or update recipes to include ingredients logic
FE: update AddRecipeForm to use dynamic form fields
BE: Add recipe_ingredients table
- ingredient varchar255
- FK recipe_id (r has many i, i belongs to 1 r, unique)
BE: Update seeds data

### Recipes have Directions/Steps/Method
Directions are a sequence of steps to follow
FE: Detail page has Directions section, listed in order numerical
FE: each step is just text for now
FE: Update fetch and create actions
FE: update add form to have dynamic steps
BE: Add recipes steps table
BE: Update seeds data

### Edit a Recipe
Editing reuses the recipe form and shows any existing data.
Recipes should be able to be saved w/o steps or ingredients.
ROUTE: `/recipes/[slug]/edit`
FE: Recipe display page updated with "Update Recipe" link 
FE: Recipe form updated to take a recipe
FE: action created to update a recipe and redirect back to its page
BE: Ensure no cascade deletes if ingrs or steps deleted

### Recipes Index View All
- toggle buttons to switch between category cards and full list
FE: add component to display as a list, sorted alphabetically

### Display 'Add Recipe' button on every page
- material style round plus sign button that hovers at z+1
- links to create recipe page
- don't show on recipe add/edit pages
FE: find an icon that works and create component
FE: figure out where to put component into pages/layouts to give it a z-index and drop shadow
FE: link it to the create recipe page