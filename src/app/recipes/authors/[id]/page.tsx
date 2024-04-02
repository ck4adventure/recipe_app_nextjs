import { getAuthorInfo } from '@/app/lib/data';
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
	const recipeRows = await getAuthorInfo(params.id);
	const info = recipeRows[0] as any;
	console.log(info)
	const { id, author_name } = info;
	const { books, sites, collections } = filterSourcesAndRecipes(recipeRows);
	console.log('books', books);
	return (
		<div>
			<div>Author: {author_name}</div>
			{books.length > 0 && (
				<div>
					<div>Books</div>
					{books.map((book) => (
						<div key={book.source_id}>
							<Link href={`/recipes/sources/${book.source_id}`}>{book.source_title}</Link>
							{/* <ul>
								{book.recipes.map((recipe: any, i: number) => (
									<li key={i}>
										<Link href={`/recipes/${recipe.recipe_slug}`}>{recipe.recipe_title}</Link>
									</li>
								))}
							</ul> */}
						</div>
					))}
				</div>
			)}
			{sites.length > 0 && (
				<div>
					<div>Books</div>
					{sites.map((item) => (
						<div key={item.source_id}>
							<Link href={`/recipes/sources/${item.source_id}`}>{item.source_title}</Link>
							{/* <ul>
								{book.recipes.map((recipe: any, i: number) => (
									<li key={i}>
										<Link href={`/recipes/${recipe.recipe_slug}`}>{recipe.recipe_title}</Link>
									</li>
								))}
							</ul> */}
						</div>
					))}
				</div>
			)}
			{collections.length > 0 && (
				<div>
					<div>Books</div>
					{collections.map((item) => (
						<div key={item.source_id}>
							<Link href={`/recipes/sources/${item.source_id}`}>{item.source_title}</Link>
						</div>
					))}
				</div>
			)}
		</div>
	)
}