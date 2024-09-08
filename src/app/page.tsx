import { GET_CATEGORIES_AND_RECIPES } from "./lib/sqlQueriesVercel";
import RecipeIndexView from "./ui/recipes/recipe_index_view";

export default async function Main() {
	const result = await GET_CATEGORIES_AND_RECIPES()
	return (
		<div>
			<main className="flex min-h-screen flex-col items-center justify-between">
				<a href="/api/auth/login">Login</a>
				<a href="/api/auth/logout">Logout</a>
				<div data-cy='recipes-index'>
					<RecipeIndexView recipes={result} />
				</div>
			</main>
		</div>
	);
}
