import React, { useState } from "react";
import { Controller, Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandGroup, CommandItem } from "@/components/ui/command";
import { ChevronsUpDown } from "lucide-react";

interface SearchableIngredientSelectProps {
	control: Control<any>;
	name: string;
	ingredientsList: any[];
}

const SearchableIngredientSelect: React.FC<SearchableIngredientSelectProps> = ({ control, name, ingredientsList }) => {
	console.log(ingredientsList[0])
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => {
				const selectedIngredient = ingredientsList.find((ing) => ing.id === field.value);
				const [open, setOpen] = useState(false);

				return (
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button variant="outline" className="w-64 justify-between">
								{selectedIngredient ? selectedIngredient.label_name : "Select an ingredient"}
								<ChevronsUpDown className="ml-2 h-4 w-4" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-64 p-0">
							<Command>
								<CommandInput placeholder="Search ingredients..." />
								<CommandGroup>
									{ingredientsList && ingredientsList.map((ingredient) => (
										<CommandItem
											key={ingredient.id}
											value={ingredient.label_name}
											onSelect={() => {
												field.onChange(ingredient.id);
												setOpen(false);
											}}
										>
											{ingredient.label_name}
										</CommandItem>
									))}
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>
				);
			}}
		/>
	)
};

export default SearchableIngredientSelect;