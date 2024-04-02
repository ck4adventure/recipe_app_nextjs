'use client'
// RecipeIndexView is a component that can displays recipes by list or category
// with toggle button to switch between list and category view
import { useState } from "react";
import CategoryView from "./category_view";
import RecipesListView from "./list_view";
const RecipeIndexView = ({ recipes }: { recipes: any }) => {
	const [viewCards, setViewCards] = useState(true);

	const handleToggle = (viewType: 'list' | 'cards') => {
		if (viewType === 'list') {
			setViewCards(false);
		} else {
			setViewCards(true);
		}
	}
	return (
		<div className="flex flex-col">
			<div className="m-4 flex flex-row justify-center" data-cy='recipe-toggle-switches'>
				{/* button goes here */}
				<button
					className="border-2 p-2"
					data-cy='recipe-toggle-cards'
					onClick={() => handleToggle("cards")}>Category</button>
				<button
					className="border-2 p-2"
					data-cy='recipe-toggle-list'
					onClick={() => handleToggle("list")}>List View</button>
			</div>
			{viewCards ? <CategoryView data={recipes} /> : <RecipesListView data={recipes} />}
		</div>
	);
}

export default RecipeIndexView;