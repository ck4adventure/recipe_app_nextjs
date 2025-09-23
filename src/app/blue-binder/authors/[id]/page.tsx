import { GET_AUTHOR_AND_SOURCES_BY_ID, GET_AUTHOR_BY_ID } from '@/app/_lib/sqlQueriesRecipes';
import Link from 'next/link';

const filterSourcesAndRecipes = (rows: any[]) => {
	const books = [];
	const sites = [];
	const collections = [];
	for (const row of rows) {
		if (row.source_type === 'BOOK') {
			books.push(row);
		} else if (row.source_type === 'SITE') {
			sites.push(row);
		} else if (row.source_type === 'PERSONAL') {
			collections.push(row);
		}
	}

	return { books, sites, collections };
}


export default async function Page({ params }: { params: { id: number } }) {
	const recipeRows = await GET_AUTHOR_AND_SOURCES_BY_ID(params.id);
	if (!recipeRows || recipeRows.length === 0) {
		const authorData: any = await GET_AUTHOR_BY_ID(params.id);
		const { name, is_profi } = authorData;
		return (
		<div className='flex flex-col items-center'>
			<div className='text-2xl'>{name}</div>
			<div className='text-sm italic'>{ is_profi ? 'Professional' : 'Amateur'} Chef</div>
			<div className="m-4">No recipes yet for this author.</div>
			</div>
		)
	}
	const info = recipeRows[0] as any;
	const { author_name, is_profi } = info;
	const { books, sites, collections } = filterSourcesAndRecipes(recipeRows);
	return (
		<div className='flex flex-col items-center'>
			<div className='text-2xl'>{author_name}</div>
			<div className='text-sm italic'>{ is_profi ? 'Professional' : 'Amateur'} Chef</div>
			{/* Display by source_type then list the recipes */}
			<div className='m-4'>
			{books.length > 0 && (
				<div className='m-4'>
					<div className='font-bold'>Books</div>
					{books.map((book) => (
						<div key={book.source_id}>
							<Link href={`/sources/${book.source_id}`}>{book.source_title}</Link>
						</div>
					))}
				</div>
			)}
			{sites.length > 0 && (
				<div className='m-4'>
					<div className='font-bold'>Recipes on the Web</div>
					{sites.map((item) => (
						<div key={item.source_id}>
							<Link href={`/sources/${item.source_id}`}>{item.source_title}</Link>
						</div>
					))}
				</div>
			)}
			{collections.length > 0 && (
				<div>
					{collections.map((item) => (
						<div key={item.source_id}>
							<Link href={`/sources/${item.source_id}`}>{item.source_title}</Link>
						</div>
					))}
				</div>
			)}
			</div>
		</div>
	)
}