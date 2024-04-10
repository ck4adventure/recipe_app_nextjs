import { GET_SOURCES } from '../lib/sqlQueriesVercel';
import Link from 'next/link';
export default async function Page() {
	const sourcesRows = await GET_SOURCES();
	return (
		<div className='flex flex-col items-center'>
			<div className='font-bold text-lg' data-cy="sources-header">Sources</div>
			<ul className='m-4'>
				{sourcesRows.map((source: any, i) => (
					<li className='m-2' key={i}><Link href={`/sources/${source.id}`}>{source.title}</Link></li>
				))}
			</ul>
		</div>
	);
}