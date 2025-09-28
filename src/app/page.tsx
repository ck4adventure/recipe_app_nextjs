import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image'



export default async function Main() {
	const imageStyle = {
		borderRadius: '50%',
		border: '1px solid #fff',
		width: '400px',
		height: 'auto',
	}

	return (
		<main className="min-h-screen flex flex-col items-center">
			<div className='mt-16'>
				<Link href="/blue-binder">
				<Image src='/app/sleepy_brida.jpg' height={720} width={627} style={imageStyle} alt='picture of authors dog brida' className='hover:drop-shadow-2xl hover:shadow-indigo-900' />
				</Link>
			</div>
		</main>
	);
}
