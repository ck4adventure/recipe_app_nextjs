feature baking log
### Baking Log
I am learning to bake professional grade bread, and I need to start learning from my timings to achieve a more consistent result.

trying to make a plan
loafer page should show anything in progress
each items main page should show latest of that item
each items index page should show its data and buttons to advance/edit/delete
TODO: leaven calculator
  - standardize the loaves/bakes enough to be able to put quantities into a form
	- hit calc button and it will tell you the kgs of dough to be made, and how much starter needed
	- rule is 100g starter for 500g flour within the dough ratios
TODO: dough calculator
 - 250g, 500g, 1kg, 1.5kg....
 - or evtl to have app context and pass along the chosen bakes from the leaven calc

#### Journeys
1. Starting a leaven
- go to loafer
- click button to start a leaven: amts, time
- redirect to main page with fresh data
- 6-12 hours elapse
- I return to loafer main page to check the time completed
- I return to loafer main page when it is done
  - click into leaven record
  - click finish leaven (no temp input)

2. Starting a dough
- most likely I have just finished a leaven
- go to create dough page


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
