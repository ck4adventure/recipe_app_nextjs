'use client'
// RecipeIndexView is a component that can displays recipes by list or category
// with toggle button to switch between list and category view
import CategoryView from "./category_view";

const RecipeIndexView = ({ recipes }: { recipes: any }) => {
  return (
	<div className="flex flex-col items-center">
	  <CategoryView data={recipes} />
	</div>
  );
};

export default RecipeIndexView;