// CategoryCard takes a category and array of recipes and displays them in a list
const CategoryCard = ({ category, categoryRecipes }: { category: string, categoryRecipes: any }) => {
	const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
	return (
		<div className="m-4 border-2 rounded-md p-2">
			<h2 className="font-bold">{formattedCategory}</h2>
			<ul>
				{categoryRecipes.map((recipe: any, index: number) => {
					return (
						<li key={index}>{recipe.recipe_title}</li>
					);
				})}
			</ul>
		</div>
	);

}

export default CategoryCard;