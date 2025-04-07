
import { GET_CHEFS_RECIPE_BY_SLUG } from "@/app/_lib/sqlQueriesChef";
import { ChefsRecipeCard } from "@/app/_ui/chefs_recipes/chefs_recipe_card";
// import { IngrCard, Ingr } from "@/app/_ui/ingrs/ingr_card";




export default async function Page({ params }: { params: { slug: string } }) {
	// fetch ingr and list all properties
	const recipe: any = await GET_CHEFS_RECIPE_BY_SLUG(params.slug);

	// check for empty/undefine recipe object
	if (!recipe) {
		return (
			<div data-cy='chef-recipe-item-page' className='flex flex-col items-center'>
				<h2 data-cy='recipe-item-not-found' className="font-bold text-lg text-center">Recipe Not Found</h2>
				<p className="text-center">The recipe you are looking for does not exist or has been removed.</p>
			</div>
		);
	}

	return (
		<div data-cy='chef-recipe-item-page' className='flex flex-col items-center'>
			<ChefsRecipeCard recipe={recipe}/>
		</div>
	);
}