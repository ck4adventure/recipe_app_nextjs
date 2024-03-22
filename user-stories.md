# User Stories

## Recipes

### Recipes Index Page
Story: As a user, I want to see all of my available recipes.
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
FE: create RecipeDetailPage
Action: getRecipeByID

### Recipe Links are Slugs not IDs
Story: As a user, I want to see the recipe title in the URL
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
