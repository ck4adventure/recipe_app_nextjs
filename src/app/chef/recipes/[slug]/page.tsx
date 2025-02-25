
import { GET_CHEFS_RECIPE_BY_SLUG } from "@/app/_lib/sqlQueriesChef";
// import { IngrCard, Ingr } from "@/app/_ui/ingrs/ingr_card";

export default async function Page({ params }: { params: { slug: string } }) {
	// fetch ingr and list all properties
	const recipe = await GET_CHEFS_RECIPE_BY_SLUG(params.slug);
	return (
		<div className='flex flex-col items-center'>
			<h2 className="font-bold text-lg text-center">{recipe.title}</h2>
			<div className="max-w-[650px]">
				<div className="m-4">
				<h3 className="font-semibold my-2">Ingredients</h3>
				<ul className="">
					{recipe.ingredients && recipe.ingredients.map((ingr: any) => (
						<li key={ingr.package_name}>{ingr.qty} {ingr.measure} {ingr.brand_name} {ingr.packaged_name}</li>
					))}
				</ul>
				</div>
				<div className="m-4">
				<h3 className="font-semibold my-2">Method</h3>
				<ol className="list-decimal">
					{recipe.steps && recipe.steps.map((step: any, i: number) => (
						<li key={i}>
							{step}
						</li>
					))}
				</ol>
				</div>
			</div>
		</div>
	);
}