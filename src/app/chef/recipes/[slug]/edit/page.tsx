// CHEFS RECIPES EDIT ITEM PAGE
import { GET_CHEFS_RECIPE_BY_SLUG } from "@/app/_lib/sqlQueriesChef";
// import { IngrCard, Ingr } from "@/app/_ui/ingrs/ingr_card";



export default async function Page({ params }: { params: { slug: string } }) {
	// fetch ingr and list all properties
	const recipe = await GET_CHEFS_RECIPE_BY_SLUG(params.slug);
	if (!recipe) {
		return (
			<div>Ooops!</div>
		);
	}
	return (
		<div className='flex flex-col items-center'>
			<h2 className="font-bold text-lg text-center">{recipe.title}</h2>
			<h4 className="font-bold text-sm text-center">{recipe.category}</h4>
			<div className="max-w-[850px]">
				<div className="m-4">
					<h3 className="font-semibold my-2">Ingredients</h3>
					<ul className="">
						{recipe.ingredients && recipe.ingredients.map((ingr: any) => (
							<li key={ingr.packaged_name} className="flex my-1">
								<div>{ingr.qty} {ingr.measure} {ingr.packaged_name}</div>{ingr.note && (<div className="flex mx-8 font-semibold">Note:<div className="font-normal">&nbsp;{ingr.note}</div></div>)}
							</li>
						))}
					</ul>
				</div>
				<div className="m-4">
					<h3 className="font-semibold my-2">Method</h3>
					<ol className="list-decimal">
						{recipe.steps && recipe.steps.map((step: any, i: number) => (
							<li key={i} className="mx-4 my-2">
								{step}
							</li>
						))}
					</ol>
				</div>

				{recipe.notes && recipe.notes.length > 0 && (
					<div className="m-4">
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