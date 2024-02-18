export default function Page({ params }: { params: { slug: string } }) {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div>
				<h1>{params.slug}</h1>
			</div>
		</main>
	)
}