import { GET_SOURCE_AND_RECIPES_BY_ID, GET_SOURCE_DATA_BY_ID } from "../../_lib/sqlQueriesRecipes";
import Link from 'next/link';

// Source Detail Page should show the source, a list of recipes and authors
export default async function Page ({ params }: { params: { id: number }}) {
	const sourceRecipes: any[] = await GET_SOURCE_AND_RECIPES_BY_ID(params.id);
	console.log(sourceRecipes);
	if (!sourceRecipes || sourceRecipes.length === 0) {
		const sourceData: any = await GET_SOURCE_DATA_BY_ID(params.id);
		const { title, source_type } = sourceData;
		return (
			<div className="flex flex-col items-center">
				<div className="text-2xl font-bold">{title}</div>
				<div className="m-4">No recipes yet for this source.</div>
			</div>
		
		)
	} else {

		const { source_title, source_url, source_type, author_name, author_slug, author_id } = sourceRecipes[0];

  
	return (
		<div className="flex flex-col items-center">
			<div className="text-2xl font-bold">{source_title}</div>
			{/* TODO add cute logo for source type */}
			{source_url && <div className="text-sm m-2"><Link href={encodeURI(source_url)}>{source_url}</Link></div>}
			{source_type && <div className="text-sm m-2">{source_type}</div>}
			{author_slug && <div className="text-sm m-2">By: <Link href={`/authors/${author_id}`}>{author_name}</Link></div>}
			<ul className="w-2/3 m-4">
				{sourceRecipes.map((data: any, i) => (
					<li className='m-2' key={i}><Link href={`/recipes/${data.recipe_slug}`}>{data.recipe_title}</Link></li>
				))}
			</ul>
		</div>
	)
	}
}