import { getCategoriesAndRecipes } from "@/app/lib/data"
import CategoryView from "@/app/ui/recipes/category_view"

export default async function Page() {
	const data = await getCategoriesAndRecipes()
	return (
		<div>
			<div className="flex justify-center">Categories</div>
			<CategoryView data={data} />
		</div>
	)
}