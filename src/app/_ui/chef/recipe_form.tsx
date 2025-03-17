'use client'

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import React from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { createChefsRecipe } from '@/app/chef/actions';

export const RecipeFormSchema = z.object({
	title: z.string().min(4),
	category: z.string(),
	label: z.string().min(4),
	slug: z.string(),
	ingredients: z.array(z.object({
		qty: z.number().min(1).max(20),
		measure: z.string().min(1, { message: "Select a measure" }),
		ingr_id: z.number().min(1, { message: "Please select an ingredient" }),
		note: z.string().optional()
	})).nonempty(),
	steps: z.array(z.object({ value: z.string().min(1, { message: "Must have at least one step" }) })).nonempty({ message: "Must have at least one step" }), // must be arrays of objects, design flaw
	notes: z.array(z.object({ value: z.string() })).optional(),
})

const measures = ['drop', 'g', 'ml', 'liter', 'tsp', 'Tbsp', 'whole',
	'pinch', 'percent', 'piece', 'cup', 'ounce'];

// from db migration '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'
const slugRegex = (str: string) => {
	return str.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-');
};


export interface IngrResult {
	id: number,
	label_name: string,
	brand: string
}

export const ChefsRecipeForm = ({ categories, ingredientsList }: { categories: string[], ingredientsList: IngrResult[] }) => {

	const form = useForm<z.infer<typeof RecipeFormSchema>>({
		resolver: zodResolver(RecipeFormSchema),
		defaultValues: {
			steps: [{ value: "" }],
			ingredients: [{
				"qty": 0,
				"measure": '',
				"ingr_id": -1
			}]
		}
	})

	const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
		control: form.control,
		name: "steps"
	});

	const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
		control: form.control,
		name: "ingredients"
	})

	const { fields: noteFields, append: appendNote, remove: removeNote } = useFieldArray({
		control: form.control,
		name: "notes"
	});


	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof RecipeFormSchema>) => {
		console.log("values submitted: ", values);
		const result = await createChefsRecipe(values);
		console.log("result returned: ", result);
	};

	const updateSlug = (title: string) => {
		const slug = slugRegex(title);
		form.setValue('slug', slug);
	};

	return (
		<Form {...form}>
			<form data-cy='recipe-form' id='recipe-form' onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[750px]">
				{/* recipe title */}
				<FormField
					control={form.control}
					name="title"
					data-cy='recipe-form-title-input'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Recipe Title</FormLabel>
							<FormControl>
								<Input
									data-cy='recipe-form-title-input'
									placeholder='Upper Case Recipe Title'
									id='recipe-title-input'
									value={field.value || ''}
									onChange={(e) => {
										updateSlug(e.target.value);
										field.onChange(e);
									}} />
							</FormControl>
							<FormDescription>
								This is the full name of your recipe.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* recipe label				 */}
				<FormField
					control={form.control}
					name="label"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Recipe Label</FormLabel>
							<FormControl>
								<Input
									data-cy='recipe-form-label-input'
									placeholder="lowercase short name for labeling"
									value={field.value || ''}
									onChange={field.onChange} />
							</FormControl>
							<FormDescription>
								This is the name that will be printed on package labeling.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* recipe slug			 */}
				<FormField
					control={form.control}
					name="slug"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Recipe Slug</FormLabel>
							<FormControl>
								<Input
									data-cy='recipe-form-slug'
									value={field.value || ''}
									readOnly 
									className='text-zinc-500'/>
							</FormControl>
							<FormDescription>
								The slug is generated from the title.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* recipe category */}
				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Recipe Category</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger 			data-cy='recipe-form-category-input'>
										<SelectValue placeholder="Select a category for the recipe." />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{categories && categories.map((cat: string, i: number) => (
										<SelectItem value={cat} key={`cat-${i}`}>{cat}</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>Category which best fits this recipe</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* recipe ingredients */}
				<div data-cy='recipe-form-ingredients-section'>
					<FormLabel>Ingredients</FormLabel>
					{ingredientFields.map((field, index) => (
						<div key={field.id} className='flex items-center'>

							{/* Quantity */}
							<FormField
								control={form.control}
								name={`ingredients.${index}.qty`}
								render={({ field }) => (
									<FormItem className=' mr-4'>
										<FormControl>
											<Input
												id={`ingredients-qty-input-${index}`}
												type="number"
												min={1}
												max={10}
												value={field.value}
												onChange={(e) => {
													const value = parseFloat(e.target.value);
													field.onChange(value);
												}}
											/>
										</FormControl>
										<FormDescription>Qty</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* measure */}
							<FormField
								control={form.control}
								name={`ingredients.${index}.measure`}
								render={({ field }) => (
									<FormItem className='w-[100px] mr-4'>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a measure.">{field.value}</SelectValue>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{measures.map((measure: string, i: number) => (
													<SelectItem value={measure} key={`measure-${i}`}>{measure}</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>Measure</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* ingredient */}
							<FormField
								control={form.control}
								name={`ingredients.${index}.ingr_id`}
								render={({ field }) => {
									const selectedIngredient = ingredientsList.find((ingr: any) => ingr.id == field.value)

									return (
										<FormItem className='w-[220px] mr-4'>
											<Select
												onValueChange={(value: string) => {
													const v = parseFloat(value);
													field.onChange(v);
												}}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select an ingredient">
															{selectedIngredient ? selectedIngredient.label_name : "Something's wrong"}
														</SelectValue>
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{ingredientsList && ingredientsList.map((ingr: any) => (
														<SelectItem value={ingr.id.toString()} key={`ingr-${ingr.id}`}>{ingr.brand}&nbsp;{ingr.label_name}</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormDescription>Ingredient</FormDescription>
											<FormMessage />
										</FormItem>
									);
								}}
							/>

							{/* note */}
							<FormField
								control={form.control}
								name={`ingredients.${index}.note`}
								render={({ field }) => (
									<FormItem className='mr-4'>
										<FormControl>
											<Input
												value={field.value || ''}
												id={`ingredients.${index}.note`}
												onChange={field.onChange}
											/>
										</FormControl>
										<FormDescription>Note</FormDescription>
									</FormItem>

								)}
							/>

							<Button
								type="button"
								variant="destructive"
								className='mt-[-20px] ml-2'
								onClick={() => removeIngredient(index)}>
								Remove
							</Button>

						</div>

					))}
					<div className='mt-4'>
						<Button type="button" onClick={() => appendIngredient({
							"qty": 0,
							"measure": "Tbsp",
							"ingr_id": 0,
							note: ""
						})}>Add Ingredient</Button>
					</div>

				</div>

				{/* recipe steps */}
				<div data-cy='recipe-form-steps-section'>
					<FormLabel>Steps</FormLabel>
					{stepFields.map((field, index) => (
						<div key={field.id} className="flex items-center space-x-2">
							<FormField
								control={form.control}
								name={`steps.${index}.value`}
								render={({ field }) => (
									<FormItem className='flex-1'>
										<FormControl>
											<Input
												type="text"
												placeholder={`Step ${index + 1}`}
												value={field.value}
												onChange={field.onChange} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className=''>
								<Button type="button" className='ml-4' variant="destructive" onClick={() => removeStep(index)}>
									Remove
								</Button>
							</div>
						</div>
					))}
					<Button className='mt-4' type="button" onClick={() => appendStep({ value: "" })}>
						Add Step
					</Button>


				</div>

				{/* recipe notes */}
				<div data-cy='recipe-form-notes-section'>
					<FormLabel>Notes</FormLabel>
					{noteFields.map((field, index) => (
						<div key={field.id} className="flex items-center">
							<FormField
								control={form.control}
								name={`notes.${index}.value`}
								render={({ field }) => (
									<FormItem className='flex-1'>
										<FormControl>
											<Input
												type="text"
												placeholder={`Note ${index + 1}`}
												value={field.value}
												onChange={field.onChange}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="button" className='ml-6' variant="destructive" onClick={() => removeNote(index)}>
								Remove
							</Button>
						</div>
					))}
					<Button className='mt-4' type="button" onClick={() => appendNote({ value: "" })}>
						Add Note
					</Button>

				</div>

				<Button data-cy='recipe-form-submit-button' type="submit" >Submit</Button>
			</form>
		</Form >
	)
}