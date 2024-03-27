'use client'
// RecipeIndexView is a component that can displays recipes by list or category
// with toggle button to switch between list and category view
import { useState } from "react";
import CategoryView from "./category_view";
import ListView from "./list_view";
const RecipeIndexView = ({recipes}: {recipes: any}) => {
	const [viewCards, setViewCards] = useState(true);
	
	const handleToggle = (viewType: 'list' | 'cards') => {
		if(viewType === 'list') {
			setViewCards(false);
		} else {
			setViewCards(true);
		}
	}
	return (
		<div>
			<div className="mx-8" data-cy='recipe-toggle-switch'>
				{/* button goes here */}
				<button className="border-2 p-2" onClick={() => handleToggle("cards")}>Category</button>
				<button className="border-2 p-2" onClick={() => handleToggle("list")}>List View</button>
			</div>
				<div>
					{viewCards ? <CategoryView data={recipes} /> : <ListView data={recipes} /> }
				</div>
		</div>
	);
}

export default RecipeIndexView;