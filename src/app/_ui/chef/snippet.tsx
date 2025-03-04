import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandGroup, CommandItem } from "@/components/ui/command";
import { ChevronsUpDown } from "lucide-react";

const RecipeForm = ({ ingredientsList }) => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      ingredients: [{ ingredientId: "", quantity: "" }],
      steps: [{ description: "" }]
    }
  });

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: "ingredients"
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-xl font-semibold">Ingredients</h3>
      {ingredientFields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-2">
          {/* Searchable Ingredient Select */}
          <Controller
            control={control}
            name={`ingredients.${index}.ingredientId`}
            render={({ field }) => {
              const selectedIngredient = ingredientsList.find((ing) => ing.id === field.value);
              const [open, setOpen] = useState(false);

              return (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-64 justify-between">
                      {selectedIngredient ? selectedIngredient.name : "Select an ingredient"}
                      <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0">
                    <Command>
                      <CommandInput placeholder="Search ingredients..." />
                      <CommandGroup>
                        {ingredientsList.map((ingredient) => (
                          <CommandItem
                            key={ingredient.id}
                            value={ingredient.name}
                            onSelect={() => {
                              field.onChange(ingredient.id);
                              setOpen(false);
                            }}
                          >
                            {ingredient.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              );
            }}
          />
          {/* Quantity Input */}
          <input
            {...register(`ingredients.${index}.quantity`)}
            placeholder="Quantity"
            type="text"
            className="border rounded p-2 w-20"
          />
          {/* Remove Ingredient */}
          <Button type="button" variant="destructive" onClick={() => removeIngredient(index)}>
            Remove
          </Button>
        </div>
      ))}
      {/* Add Ingredient Button */}
      <Button type="button" onClick={() => appendIngredient({ ingredientId: "", quantity: "" })}>
        Add Ingredient
      </Button>

      {/* Submit Recipe Button */}
      <Button type="submit" className="mt-4">
        Submit Recipe
      </Button>
    </form>
  );
};

export default RecipeForm;
