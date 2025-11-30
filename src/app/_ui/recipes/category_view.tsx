import CategoryCard from "./category_card";

// formatCategoryAndRecipes takes a list of recipes and formats them 
// into a dictionary of categories and their respective recipes
const formatCategoryAndRecipes = (row_data: any) => {
	const formattedData: any = {};
	row_data.forEach((row: any) => {
		const category = row.category_name;
		if (!formattedData[category]) {
			formattedData[category] = [];
		}
		formattedData[category].push(row);
	});
	return formattedData;
}

const CategoryView = ({data}: {data: any}) => {
	const recipes_by_category = formatCategoryAndRecipes(data);
	return (
		<div data-cy='recipe-categories' className="w-full md:w-1/2 flex flex-col justify-center">
			{Object.keys(recipes_by_category).map((catName: string, index: number) => {
				const recipeList: any = recipes_by_category[catName];
				return (
					<CategoryCard key={index} category={catName} categoryRecipes={recipeList} />
				);
			})}
		</div>
	);
}

export default CategoryView;