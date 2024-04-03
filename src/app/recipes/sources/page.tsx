import { getSources } from '@/app/lib/data';
import Link from 'next/link';
export default async function Page() {
	const sourcesRows = await getSources();
	return (
		<div className='flex flex-col items-center'>
			<div className='font-bold text-lg' data-cy="sources-header">Sources</div>
			<ul className='m-4'>
				{sourcesRows.map((source: any, i) => (
					<li className='m-2' key={i}><Link href={`/recipes/sources/${source.id}`}>{source.title}</Link></li>
				))}
			</ul>
		</div>
	);
}