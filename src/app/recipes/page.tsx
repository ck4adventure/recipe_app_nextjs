import { getRecipeCategoriesTitles } from "../lib/data";
import { recipes_data } from "../../../cypress/fixtures/recipes_data";

// data comes in in an array of objects, each object is an joined result of category and recipe
const reshapeData = (data: any) => {
	const newData: any = {};
	data.forEach((recipe: any) => {
		newData[recipe.category] = {

		}
	});
	return newData;
}

const RecipeList = ({category, categoryRecipes}: {category: string, categoryRecipes: any}) => {
	
	return (
		<div className="m-4 border-2 rounded-md p-2">
			<h2 className="m-1">{category}</h2>
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
	const dataRows = await getRecipeCategoriesTitles();
	const catObject = reshapeData(dataRows);
	console.log(catObject);
	return (
		<div>
			<title>Recipes</title>
			<main className='flex flex-col items-center'>
				<h1 className='m-4' data-cy='recipes-header'>Recipes</h1>
				<div className='' data-cy='recipe-categories'>
					<h2>By Category:</h2>
					<div className="m-2 flex flex-row">
						{Object.keys(recipes_data).map((catName, index) => {
							const catGroup: any = recipes_data[catName];
							return (
								<RecipeList key={index} category={catName} categoryRecipes={catGroup} />	
							);
						})}
					</div>
				</div>
			</main>
		</div>
	);
}	