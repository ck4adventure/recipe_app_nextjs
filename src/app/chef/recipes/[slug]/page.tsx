
import { GET_CHEFS_RECIPE_BY_SLUG } from "@/app/_lib/sqlQueriesChef";
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
			<h2 data-cy='recipe-title' className="font-bold text-lg text-center">{recipe.title}</h2>
			<h2 data-cy='recipe-label-name' className="font-bold text-lg text-center">{recipe.label_name}</h2>
			<h4 data-cy='recipe-category' className="font-bold text-sm text-center">{recipe.category}</h4>
			<div className="max-w-[850px]">
				<div data-cy='recipe-ingredients-section' className="m-4">
					<h3 className="font-semibold my-2">Ingredients</h3>
					<ul className="">
						{recipe.ingredients && recipe.ingredients.map((ingr: any) => (
							<li data-cy='recipe-ingredient' key={ingr.packaged_name} className="flex my-1">
								<div className="flex"><p data-cy='ingredient-qty'>{ingr.qty}</p><p data-cy='ingredient-measure'>&nbsp;{ingr.measure}</p><p data-cy='ingredient-name'>&nbsp;{ingr.packaged_name}</p></div>{ingr.note && (<div className="flex mx-8 font-semibold">&nbsp;Note:<div data-cy='ingredient-note' className="font-normal">&nbsp;{ingr.note}</div></div>)}
							</li>
						))}
					</ul>
				</div>
				<div data-cy='recipe-method-section' className="m-4">
					<h3 className="font-semibold my-2">Method</h3>
					<ol className="list-decimal">
						{recipe.steps && recipe.steps.map((step: any, i: number) => (
							<li data-cy='recipe-step' key={i} className="mx-4 my-2">
								{step}
							</li>
						))}
					</ol>
				</div>

				{recipe.notes && recipe.notes.length > 0 && (
					<div data-cy='recipe-notes-section' className="m-4">
						<div className="font-semibold my-2">Notes</div>
						<ul>
							{recipe.notes && recipe.notes.map((note: string, i: number) => (
								<li key={i}>{note}</li>
							))}
						</ul>
					</div>
				)}
			</div>

		</div>
	);
}