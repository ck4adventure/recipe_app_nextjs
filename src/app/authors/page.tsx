// authors index page
import Link from 'next/link';
import { GET_AUTHORS } from '../lib/sqlQueriesVercel';
export default async function Page() {
	const authorsRows = await GET_AUTHORS();
	return (
		<div className='flex flex-col items-center'>
			<div className='font-bold text-lg' data-cy="authors-header">Authors</div>
				<ul className='m-4 flex flex-col items-center'>
					{authorsRows.map((author: any) => (
						<li className='m-2' key={author.id}><Link href={`/authors/${author.id}`}>{author.name}</Link></li>
					))}
				</ul>
		</div>
	);
}