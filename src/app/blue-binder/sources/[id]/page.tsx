import { GET_SOURCE_AND_RECIPES_BY_ID, GET_SOURCE_DATA_BY_ID } from "@/app/_lib/sqlQueriesRecipes";
import Link from 'next/link';
import { notFound } from 'next/navigation';


// Source Detail Page should show the source, a list of recipes and authors
export default async function Page({ params }: { params: { id: number } }) {
	const sourceId = Number(params.id);
	if (Number.isNaN(sourceId)) notFound();

	const sourceData: any = await GET_SOURCE_DATA_BY_ID(params.id);
		if (!sourceData) {
		// source not found in DB
		return notFound();
	}

	const sourceRecipes: any[] = await GET_SOURCE_AND_RECIPES_BY_ID(params.id);

	if (!sourceRecipes || sourceRecipes.length === 0) {
		return (
			<div className="flex flex-col items-center">
				<div className="text-2xl font-bold">{sourceData.title}</div>
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
				{author_slug && <div className="text-sm m-2">By: <Link href={`/blue-binder/authors/${author_id}`}>{author_name}</Link></div>}
				<ul className="flex flex-col items-center w-2/3 my-4">
					{sourceRecipes.map((data: any, i) => (
						<li className='my-2' key={i}><Link href={`/blue-binder/recipes/${data.recipe_slug}`}>{data.recipe_title}</Link></li>
					))}
				</ul>
			</div>
		)
	}
}