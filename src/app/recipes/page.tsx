import Image from "next/image";
import Link from "next/link";

const recipes = [
	{
		name: "Meringue Puffs",
		slug: "meringue-puffs"
	},
	{
		name: "Tart Pastry",
		slug: "tart-pastry"
	}
]

export default function Page() {
	return (
		<>
			<title>Recipes</title>
			<main className="flex min-h-screen flex-col items-left justify-between p-24">
				<div>
					<h1>Recipes Page</h1>
				</div>
				<div>
					<ul>
						<li><Link href="recipes/add">Add a Recipe</Link></li>
					</ul>
				</div>
				<div>
					Latest Recipes
					<ul>
						{recipes.map(recipe => {
							return (
							<li>
								<Link href={`/recipes/${recipe.slug}`}>{recipe.name}</Link>
							</li>
							)
						})}
					</ul>
				</div>
				<div>
					TODO: add Search box/functionality
				</div>
				<div>
					TODO: create links by tags (nationality, gf, vegan, etc)
				</div>

			</main>
		</>
	);
}
