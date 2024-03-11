import { recipes_data } from "../../../cypress/fixtures/recipes_data";

const RecipeList = ({ category, categoryRecipes }: { category: string, categoryRecipes: any }) => {
	const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
	return (
		<div className="m-4 border-2 rounded-md p-2">
			<h2 className="font-bold">{formattedCategory}</h2>
			<ul>
				{categoryRecipes.map((recipe: any, index: number) => {
					return (
						<li key={index}>{recipe.title}</li>
					);
				})}
			</ul>
		</div>
	);

}

// Recipe Index Page should display a list of recipes
export default async function Page() {
	return (
		<div>
			<title>Recipes</title>
			<main className='flex flex-col items-center'>
				<h1 className='m-4' data-cy='recipes-header'>Recipes</h1>
				<div data-cy='recipe-categories' className="m-2 flex flex-row">
					{Object.keys(recipes_data).map((catName, index) => {
						const catGroup: any = recipes_data[catName];
						return (
							<RecipeList key={index} category={catName} categoryRecipes={catGroup} />
						);
					})}
				</div>
			</main>
		</div>
	);
}	