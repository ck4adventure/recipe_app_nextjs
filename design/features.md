## Summary

/recipes - Original implementation was to get a feel for the basic relations of recipes, authors and sources the way a home cook might want to organize them and browse by source, author, or recipe title. Catch point here was that recipe files were in json/yaml format and not in a db.

/loafer - An exploration of writing out a tracker for mixing, shaping and baking dough into loaves, but there was a catch point on how to organize so many different choice paths, so it got put on hold.

/chefs - Second implementation of recipes, this time focusing on a real-world use case: printing product labels that list all recipe ingredients, and all allergens related to the ingredients used


## Upcoming Features

### Favorite Products/Recipes
Be able to toggle favorite (star/heart) on off for each recipe.
Display favorites on the Chef's home screen.

### Last visited product/recipe
Keep track of recipe page visits and show the 5 most recent

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