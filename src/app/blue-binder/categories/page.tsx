import { GET_CATEGORIES_AND_RECIPES } from "@/app/_lib/sqlQueriesRecipes"
import CategoryView from "@/app/_ui/recipes/category_view"

export const revalidate = 60; // revalidate in seconds

export default async function Page() {
	const data = await GET_CATEGORIES_AND_RECIPES()
	return (
		<div>
			<div className="flex justify-center">Categories</div>
			<CategoryView data={data} />
		</div>
	)
}