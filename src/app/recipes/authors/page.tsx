// authors index page
import { getAuthors } from '@/app/lib/data';

export default async function Page() {
	const authorsRows = await getAuthors();
	return (
		<div>
			<div data-cy="authors-header">Authors Index Page</div>
			<div data-cy="authors-list">Authors List</div>
			<ul>
				{authorsRows.map((author: any) => (
					<li key={author.id}>{author.full_name}</li>
				))}
			</ul>
		</div>
	);
}