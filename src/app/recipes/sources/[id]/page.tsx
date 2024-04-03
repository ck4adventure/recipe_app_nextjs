import { getSourceInfoById, getRecipesForSource } from "@/app/lib/data";
import Link from 'next/link';
export default async function Page ({ params }: { params: { id: number }}) {
	const sourceInfo = await getSourceInfoById(params.id) as any;
	const sourceRecipes = await getRecipesForSource(params.id);
	const { title, full_name, is_profi, source_url, author_id, source_type } = sourceInfo;
  
	return (
		<div className="flex flex-col items-center">
			<div className="text-2xl font-bold">{title}</div>
			{/* TODO add cute logo for source type */}
			<div className="text-sm">By:<Link href={`/recipes/authors/${author_id}`}> {full_name}, {is_profi? 'Professional' : 'Amateur'} Chef </Link></div>
			{source_url && <div className="text-sm m-2"><Link href={encodeURI(source_url)}>{source_url}</Link></div>}
			<ul className="w-2/3 m-4">
				{sourceRecipes.map((data: any, i) => (
					<li className='m-2' key={i}><Link href={`/recipes/r/${data.recipe_slug}`}>{data.recipe_title}</Link></li>
				))}
			</ul>
		</div>
	)
}