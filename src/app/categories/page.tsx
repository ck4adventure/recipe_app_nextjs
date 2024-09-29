import { GET_CATEGORIES_AND_RECIPES } from "../../../lib/sqlQueriesRecipes"
import CategoryView from "../ui/recipes/category_view"

export default async function Page() {
	const data = await GET_CATEGORIES_AND_RECIPES()
	return (
		<div>
			<div className="flex justify-center">Categories</div>
			<CategoryView data={data} />
		</div>
	)
}