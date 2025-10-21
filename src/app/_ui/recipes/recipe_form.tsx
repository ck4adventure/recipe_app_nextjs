// RecipeForm is a client component that displays a form
// with a recipe title input and a select dropdown to choose a category
// it should manage the state and submit the form
'use client'
import { createRecipeAndRedirect, updateRecipeAndRedirect } from "../../blue-binder/recipes/actions";
import { createAuthorAndRefresh, getAuthors } from "@/app/blue-binder/authors/actions";
import { useState } from "react";
import IngredientField from "./ingredient_field";
import DirectionField from "./direction_field";
import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";



export const RecipeForm = ({ authorsRows, sourcesRows, categoryRows, recipe }: { authorsRows: any, sourcesRows: any, categoryRows: any, recipe?: any }) => {
	const [recipeTitle, setRecipeTitle] = useState<string>(recipe ? recipe.recipe_title : '');
	const [categoryID, setCategoryID] = useState<number>(recipe ? recipe.category_id : 1);
	const [authors, setAuthors] = useState(authorsRows);
	const [ingredients, setIngredients] = useState<string[]>((recipe && recipe.ingredients) ? recipe.ingredients : ['', '']);
	const [steps, setSteps] = useState<string[]>((recipe && recipe.steps) ? recipe.steps : ['', '']);
	const [notes, setNotes] = useState<string[]>((recipe && recipe.notes) ? recipe.notes : ['']);
	const [authorID, setAuthorID] = useState<number>(recipe ? recipe.author_id : 1);
	const [sourceID, setSourceID] = useState<number>(recipe ? recipe.source_id : 1);

	const [authorModalOpen, setAuthorModalOpen] = useState<boolean>(false);
	const [authorName, setAuthorName] = useState<string>("");
	const [authorIsProfi, setAuthorIsProfi] = useState<boolean>(false);




	const addField = (type: 'ingredients' | 'steps' | 'notes') => {
		if (type === 'steps') {
			setSteps([...steps, '']);
		} else if (type === 'notes') {
			setNotes([...notes, '']);
		} else {
			setIngredients([...ingredients, '']);
		}
	}

	const handleIngredientChange = (index: number, value: string) => {
		const newIngredients = [...ingredients];
		newIngredients[index] = value;
		setIngredients(newIngredients);
	}

	const handleIngredientDelete = (index: number) => {
		const newIngredients = [...ingredients];
		newIngredients.splice(index, 1);
		setIngredients(newIngredients);
	}

	const handleDirectionChange = (index: number, value: string) => {
		const newSteps = [...steps];
		newSteps[index] = value;
		setSteps(newSteps);
	}

	const handleDirectionDelete = (index: number) => {
		const newSteps = [...steps];
		newSteps.splice(index, 1);
		setSteps(newSteps);
	}

	const handleNoteChange = (index: number, value: string) => {
		const newNotes = [...notes];
		newNotes[index] = value;
		setNotes(newNotes);
	}

	const handleNoteDelete = (index: number) => {
		const newNotes = [...notes];
		newNotes.splice(index, 1);
		setNotes(newNotes);
	}


	const handleRecipeSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const actualIngredients = ingredients.filter(ingr => ingr.length > 0);
			const actualSteps = steps.filter(step => step.length > 0);
			const actualNotes = notes.filter(note => note.length > 0);
			if (recipe) {
				await updateRecipeAndRedirect(recipe.recipe_id, recipeTitle, categoryID, sourceID, authorID, actualIngredients, actualSteps, actualNotes);
			} else {
				await createRecipeAndRedirect(recipeTitle, categoryID, sourceID, authorID, actualIngredients, actualSteps, actualNotes);
			}
		} catch (error) {
			// Optionally show an error message to the user
			console.error("Failed to submit recipe:", error);
		}
	};

	const handleNameChange = (value: string) => {
		console.log("changing name to: ", value)
		setAuthorName(value);
	}

	const handleProfiChange = (value: boolean) => {
		const isProfi = value.toString();
		console.log("changing profi to: ", isProfi)
		setAuthorIsProfi(value);
	}

	const handleAuthorSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			console.log("inside author submit modal on recipe");
			await createAuthorAndRefresh(authorName, authorIsProfi);
			setAuthorModalOpen(false);
			// After successful author creation
			const res = await getAuthors();
			setAuthors(res);
		} catch (error) {
			// Optionally show an error message to the user
			console.error("Failed to add author:", error);
		}
	}

	return (
		<Card className="w-[700px] m-4 p-8 shadow">

			<h1 className="my-2 font-bold">{recipe ? 'Update' : 'Add'} Recipe</h1>
			<form data-cy='recipe-form' className="my-4 flex flex-col justify-center" onSubmit={handleRecipeSubmit}>

				{/* Recipe Title */}
				<div className="my-2">
					<label className='flex items-center' htmlFor="recipe-title">Recipe Title
						<input
							id="recipe-title"
							data-cy='recipe-title-input'
							className="grow border-b border-slate-300"
							onChange={e => setRecipeTitle(e.target.value)}
						>
						</input>
					</label>
				</div>

				{/* Category Select */}
				<div className="my-2 flex">
					<label htmlFor="category-select" className="w-[350px] flex justify-between items-center">Category
						<select
							id="category-select"
							className="w-[225px]"
							onChange={e => setCategoryID(parseInt(e.target.value))}
							data-cy='recipe-category-select'
							value={categoryID}
						>
							{categoryRows.map((row: any) => (
								<option
									key={row.id}
									value={row.id}>
									{row.name}
								</option>))}
						</select>
					</label>
				</div>

				{/* Source Select */}
				<div className="my-2 flex">
					<label htmlFor="source-select" className="w-[350px] flex justify-between items-center">Source
						<select
							id="source-select"
							className="w-[250px]"
							onChange={e => setSourceID(parseInt(e.target.value))}
							data-cy='recipe-source-select'
							value={sourceID}
						>
							{sourcesRows.map((row: any) => (
								<option
									key={row.id}
									value={row.id}>
									{row.title}
								</option>))}
						</select>
					</label>
					{/* TODO: add modal for source creation, on submit it goes to db, but also right back to this form, no redirect */}

				</div>

				{/* Author Select */}
				<div className="my-2 flex">
					<label htmlFor="author-select" className="w-[350px] flex justify-between items-center">Author
						<select
							id="author-select"
							className="w-[250px]"
							onChange={e => setAuthorID(parseInt(e.target.value))}
							data-cy='recipe-author-select'
							value={authorID}
						>
							{authors.map((row: any) => (
								<option
									key={row.id}
									value={row.id}>
									{row.name}
								</option>))}
						</select>
					</label>

					<Dialog open={authorModalOpen} onOpenChange={setAuthorModalOpen} >
						<div>
							<DialogTrigger asChild>
								<Button variant="outline" size={"sm"}>Add Author</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Add Author</DialogTitle>
									<DialogDescription>
										Add author information here. Click save when you&apos;re
										done.
									</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4">
									<div className="grid gap-3">
										<Label htmlFor="author-name">Name</Label>
										<Input id="author-name" name="author-name" defaultValue="author's name" onChange={e => handleNameChange(e.target.value)} />
									</div>
									<div className="grid gap-3">
										<label htmlFor="isProfi-select" className="w-[350px] flex justify-between items-center">Is Professional?
											<select
												id="isProfi-select"
												className="w-[225px]"
												data-cy='isProfi-select'
												onChange={e => handleProfiChange(JSON.parse(e.target.value))}
												value={authorIsProfi.toString()}
											>
												<option
													key={"true"}
													value={"true"}>
													True
												</option>
												<option
													key={"false"}
													value={"false"}>
													False
												</option>
											</select>
										</label>
									</div>
								</div>
								<DialogFooter>
									<DialogClose asChild>
										<Button variant="outline">Cancel</Button>
									</DialogClose>
									<DialogClose asChild>
										<Button type="button" onClick={handleAuthorSubmit}>Save</Button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>

						</div>
					</Dialog>

				</div>

				{/* Ingredients Section */}
				<fieldset data-cy='recipe-ingredients-section' className='my-4'>Ingredients
					{ingredients.map((ingredient, i) => (
						<IngredientField
							key={i}
							value={ingredient}
							onChange={(value) => handleIngredientChange(i, value)}
							onDelete={() => handleIngredientDelete(i)} />
					))}
					<button type="button" data-cy='add-ingr-button' onClick={() => addField("ingredients")}>+ Add Ingredient</button>
				</fieldset>
				{/* Steps Section */}
				<fieldset data-cy='recipe-steps-section' className='my-4'>Steps
					{steps.map((direction, i) => (
						<DirectionField
							key={i}
							value={direction}
							onChange={(value) => handleDirectionChange(i, value)}
							onDelete={() => handleDirectionDelete(i)} />

					))}
					<button type="button" data-cy='add-dir-button' onClick={() => addField("steps")}>+ Add Step</button>

				</fieldset>
				{/* Notes Section */}
				<fieldset data-cy='recipe-notes-section' className='my-4'>Notes
					{notes.map((note, i) => (
						<DirectionField
							key={i}
							value={note}
							onChange={(value) => handleNoteChange(i, value)}
							onDelete={() => handleNoteDelete(i)} />

					))}
					<button type="button" data-cy='add-note-button' onClick={() => addField("notes")}>+ Add Note</button>

				</fieldset>
				{/* Submit button */}
				<div className="m-4">
					<button
						type="submit"
						className="m-4"
						data-cy='recipe-submit-button'
						onSubmit={handleRecipeSubmit}
					>{recipe ? 'Update' : 'Add'} Recipe</button>
				</div>
			</form>
		</Card>
	);
}