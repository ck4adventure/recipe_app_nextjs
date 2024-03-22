import Link from "next/link";
import { getCategoriesAndRecipes } from "@/app/lib/data";
import CategoryCard from "../ui/headerbar/recipes/category_card";

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
	const result = await getCategoriesAndRecipes()
	const recipes_data = formatCategoryAndRecipes(result);

	return (
		<div className='flex flex-col max-w-screen-md justify-center items-center m-auto'>
			<title>Recipes</title>
			<main >
				<div data-cy='recipes-headerbar' className='flex justify-between my-4 mx-8'>
					<h1 className='' data-cy='recipes-header-type'>Recipes By Category</h1>
					<Link 
					  className='' 
						data-cy='add-recipe-link'
						href={'/recipes/add-recipe'}
						>Add Recipe</Link>
				</div>
				<div data-cy='recipe-categories' className="m-2 grid grid-flow-row grid-cols-2">
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