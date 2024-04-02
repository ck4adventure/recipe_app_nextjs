import { getSources } from '@/app/lib/data';
import Link from 'next/link';
export default async function Page() {
	const sourcesRows = await getSources();
	return (
		<div>
			<div data-cy="sources-header">Sources Index Page</div>
			<div data-cy="sources-list-books">Books</div>
			<div data-cy="sources-list-sites">Sites</div>
			<div data-cy="sources-list-collections">Collections</div>
			<ul>
				{sourcesRows.map((source: any, i) => (
					<li key={i}><Link href={`/recipes/sources/${source.id}`}>{source.title}</Link></li>
				))}
			</ul>
		</div>
	);
}