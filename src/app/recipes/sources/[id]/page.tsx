import { getSourceAuthorRecipes } from "@/app/lib/data";
import Link from 'next/link';
export default async function Page ({ params }: { params: { id: number }}) {
	const recipeRows = await getSourceAuthorRecipes(params.id);
	const info = recipeRows[0] as any;
	console.log(info)
	const { title, full_name, is_profi, source_url } = info;
  return (
		<div>
			<div>Title: {title}</div>
			<div>Author: {full_name}, {is_profi? 'Professional' : 'Amateur'} Chef</div>
			{source_url && <div>Source URL: {source_url}</div>}
			<div>Recipes: </div>
			<ul>
				{recipeRows.map((data: any, i) => (
					<li key={i}><Link href={`/recipes/${data.recipe_slug}`}>{data.recipe_title}</Link></li>
				))}
			</ul>
		</div>
	)
}