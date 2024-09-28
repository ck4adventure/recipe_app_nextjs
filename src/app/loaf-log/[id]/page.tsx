export default function Page ({ params }: { params: { id: string } }) {
	console.log(params)
	
	return (
		<div>
			Log Detail Page with Update Actions Coming Next for {params.id}
		</div>
	)
}