// authors index page
import Link from 'next/link';
import { getAuthors } from '@/app/lib/data';

export default async function Page() {
	const authorsRows = await getAuthors();
	return (
		<div className='flex flex-col items-center'>
			<div className='font-bold text-lg' data-cy="authors-header">Authors</div>
				<ul className='m-4 flex flex-col items-center'>
					{authorsRows.map((author: any) => (
						<li className='m-2' key={author.id}><Link href={`/authors/${author.id}`}>{author.full_name}</Link></li>
					))}
				</ul>
		</div>
	);
}