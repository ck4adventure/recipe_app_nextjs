// authors index page
import Link from 'next/link';
import { getAuthors } from '@/app/lib/data';

export default async function Page() {
	const authorsRows = await getAuthors();
	return (
		<div>
			<div data-cy="authors-header">Authors Index Page</div>
			<div data-cy="authors-list">Authors List: </div>
			<ul>
				{authorsRows.map((author: any) => (
					<li key={author.id}><Link href={`/recipes/authors/${author.id}`}>{author.full_name}</Link></li>
				))}
			</ul>
		</div>
	);
}