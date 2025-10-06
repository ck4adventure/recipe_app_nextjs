import { GET_AUTHOR_AND_SOURCES_BY_ID, GET_AUTHOR_BY_ID } from '@/app/_lib/sqlQueriesRecipes';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SquarePenIcon } from "lucide-react";


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


export default async function Page({ params }: { params: { id: string } }) {
	const authorId = Number(params.id);
	if (Number.isNaN(authorId)) notFound();

	// First ensure the author exists. If not, return 404.
	const authorData: any = await GET_AUTHOR_BY_ID(authorId);
	if (!authorData) {
		// author not found in DB
		return notFound();
	}

	const recipeRows = await GET_AUTHOR_AND_SOURCES_BY_ID(authorId);

	const { name, is_profi } = authorData;
	const { books, sites, collections } = filterSourcesAndRecipes(recipeRows);
	return (
		<div className='flex flex-col items-center'>
			<div className='flex items-center'>
				<div className='text-2xl mr-6'>{name}</div>
				<div><Link href={`/blue-binder/authors/${authorData.id}/edit`}><SquarePenIcon /></Link></div>
			</div>
			<div className='text-sm italic'>{is_profi ? 'Professional' : 'Amateur'} Chef</div>
			{/* Display by source_type then list the recipes */}
			<div className='w-2/4 my-4'>
				{books.length > 0 && (
					<div className='my-4'>
						<div className='font-bold'>Books</div>
						{books.map((book) => (
							<div key={book.source_id}>
								<Link href={`/blue-binder/sources/${book.source_id}`}>{book.source_title}</Link>
							</div>
						))}
					</div>
				)}
				{sites.length > 0 && (
					<div className='m-4'>
						<div className='font-bold'>Recipes on the Web</div>
						{sites.map((item) => (
							<div key={item.source_id}>
								<Link href={`/blue-binder/sources/${item.source_id}`}>{item.source_title}</Link>
							</div>
						))}
					</div>
				)}
				{collections.length > 0 && (
					<div>
						{collections.map((item) => (
							<div key={item.source_id}>
								<Link href={`/blue-binder/sources/${item.source_id}`}>{item.source_title}</Link>
							</div>
						))}
					</div>
				)}
			</div>
			{recipeRows.length < 1 && (
				<div>
					No sources yet for this author
				</div>
			)}
		</div>
	)
}