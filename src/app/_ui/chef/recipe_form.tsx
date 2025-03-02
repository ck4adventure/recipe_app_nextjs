'use client'

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
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

import { Input } from "@/components/ui/input";
import React from 'react';

const measures = ['drop', 'g', 'ml', 'liter', 'tsp', 'Tbsp', 'whole',
	'pinch', 'percent', 'piece', 'cup', 'ounce']

const formSchema = z.object({
	title: z.string().optional(),
	category: z.string().optional(),
	label: z.string().optional(),
	slug: z.string().optional(),
	ingredients: z.array(z.object({
		qty: z.number().optional(),
		measure: z.string().optional(),
		ingr_id: z.number().optional(),
		note: z.string().optional()
	})),
	steps: z.array(z.object({ value: z.string() })), // must be arrays of objects, design flaw
	notes: z.array(z.object({ value: z.string() })),
})

export const ChefsRecipeForm = ({ categories }: { categories: string[] }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			label: "",
			category: "misc.",
			ingredients: [{
				"qty": 0,
				"measure": "Tbsp",
				"ingr_id": 0,
				note: ""
			}],
			steps: [{ value: "" }],
			notes: [{ value: "" }],
		},
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
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log("in on submit")
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	};

	return (
		<Form {...form} >
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[750px]">
				{/* recipe title */}
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Recipe Title</FormLabel>
							<FormControl>
								<Input placeholder="Full Title in Uppercase" {...field} />
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
								<Input placeholder="lowercase short name for labeling" {...field} />
							</FormControl>
							<FormDescription>
								This is the name that will be printed on package labeling.
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
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a category for the recipe." />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{categories && categories.map((cat: string, i: number) => (
										<SelectItem value={cat} key={`cat-${i}`}>{cat}</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>Select a category for the recipe.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* recipe ingredients */}
				<div>
					<FormLabel>Ingredients</FormLabel>
					{ingredientFields.map((field, index) => (
						<div key={`${field}-${index}`} className='flex items-center'>
							<FormField
								control={form.control}
								name={`ingredients.${index}.qty`}
								render={({ field }) => (
									<FormItem className=' mr-4'>
										<FormControl>
											<Input
												type="number"
												min={0}
												max={10}
												{...field}
											/>
										</FormControl>
										<FormDescription>Qty</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name={`ingredients.${index}.measure`}
								render={({ field }) => (
									<FormItem className='w-[100px] mr-4'>
										<Select onValueChange={field.onChange}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a measure." />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{measures.map((measure: string, i: number) => (
													<SelectItem value={measure} key={`measure-${i}`}>{measure}</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>Measure</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`ingredients.${index}.ingr_id`}
								render={({ field }) => (
									<FormItem className='mr-4'>
										<FormControl>
											<Input type='number' {...field} />
										</FormControl>
										<FormDescription>Ingredient</FormDescription>
									</FormItem>

								)}
							/>
							<FormField
								control={form.control}
								name={`ingredients.${index}.note`}
								render={({ field }) => (
									<FormItem className='mr-4'>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormDescription>Note</FormDescription>
									</FormItem>

								)}
							/>
							<Button
								type="button"
								variant="destructive"
								className='mt-[-20px]'
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
				<div>
					<FormLabel>Steps</FormLabel>
					{stepFields.map((field, index) => (
						<div key={field.id} className="flex items-center space-x-2">
							<FormField
								control={form.control}
								name={`steps.${index}.value`}
								render={({ field }) => (
									<FormItem className='flex-1'>
										<FormControl>
											<Input type="text" placeholder={`Step ${index + 1}`} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="button" variant="destructive" onClick={() => removeStep(index)}>
								Remove
							</Button>
						</div>
					))}
					<Button className='mt-4' type="button" onClick={() => appendStep({ value: "" })}>
						Add Step
					</Button>


				</div>

				{/* recipe notes */}
				<div>
					<FormLabel>Notes</FormLabel>
					{noteFields.map((field, index) => (
						<div key={field.id} className="flex items-center space-x-2">
							<FormField
								control={form.control}
								name={`notes.${index}.value`}
								render={({ field }) => (
									<FormItem className='flex-1'>
										<FormControl>
											<Input type="text" placeholder={`Note ${index + 1}`} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="button" variant="destructive" onClick={() => removeNote(index)}>
								Remove
							</Button>
						</div>
					))}
					<Button className='mt-4' type="button" onClick={() => appendNote({ value: "" })}>
						Add Note
					</Button>

				</div>

				<Button type="submit" >Submit</Button>
			</form>
		</Form >
	)
}