import { getCategoriesAndRecipes } from "../../../db/actions/recipes.mjs";
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
// Recipe Index Page should display a list of recipes
export default async function Page() {
	const row_data = await getCategoriesAndRecipes()
	const recipes_data = formatCategoryAndRecipes(row_data);

	return (
		<div>
			<title>Recipes</title>
			<main className='flex flex-col items-center'>
				<h1 className='m-4' data-cy='recipes-header'>Recipes</h1>
				<div data-cy='recipe-categories' className="m-2 flex justify-center flex-wrap">
					{Object.keys(recipes_data).map((catName, index) => {
						const catGroup: any = recipes_data[catName];
						return (
							<CategoryCard key={index} category={catName} categoryRecipes={catGroup} />
						);
					})}
				</div>
			</main>
		</div>
	);
}	