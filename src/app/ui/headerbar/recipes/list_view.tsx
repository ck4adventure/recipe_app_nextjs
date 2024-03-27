'use client'
import Link from "next/link";

const ListView = ({ data }: { data: any[] }) => {
	const sortedData = data.sort((a, b) => {
		if (a.recipe_title < b.recipe_title) {
			return -1;
		}
		if (a.recipe_title > b.recipe_title) {
			return 1;
		}
		return 0;
		}
	);
	return (
		<div data-cy='recipes-list' className="m-4">
			<ul>
				{sortedData.map((recipe: any, index: number) => {
					return (
						<li className='my-2' key={index}><Link data-cy='recipe-link' href={`/recipes/${recipe.recipe_slug}`}>{recipe.recipe_title}</Link></li>
					);
				})}
			</ul>
		</div>
	);
}

export default ListView;