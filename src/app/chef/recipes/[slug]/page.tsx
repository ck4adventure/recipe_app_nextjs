
import { GET_CHEFS_RECIPE_BY_SLUG } from "@/app/_lib/sqlQueriesChef";
// import { IngrCard, Ingr } from "@/app/_ui/ingrs/ingr_card";

export default async function Page({ params }: { params: { slug: string } }) {
	// fetch ingr and list all properties
	const recipe = await GET_CHEFS_RECIPE_BY_SLUG(params.slug);
	console.log(recipe)
	return (
		<div className='flex flex-col justify-center m-4'>
			<p>{recipe.title}</p>
			<ul>
				{recipe.ingredients && recipe.ingredients.map((ingr: any) => (
					<li key={ingr.package_name}>{ingr.qty} {ingr.measure} {ingr.brand} {ingr.packaged_name}</li>
				))}
			</ul>
			<ul>
				{recipe.steps && recipe.steps.map((step: any, i: number) => (
					<li key={i}>
						{step}
					</li>
				))}
			</ul>
		</div>
	);
}