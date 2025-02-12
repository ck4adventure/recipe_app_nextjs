import { GET_ALL_INGRS } from "@/app/_lib/sqlQueriesChef";

export default async function Page() {
	// fetch ingrs and group by first letter or category, showing first 5 of each
	const ingrs = await GET_ALL_INGRS();
	return (
		<div className=''>
			<div data-cy='ingrs-index'>
				<div className="m-8 flex justify-center">
					<h1>Ingredients Index Page</h1>
				</div>
				<div className="m-8">
					{ingrs && (
						ingrs.map(item => (
							<div data-cy='ingrs-index-list-item' className="mx-4" key={item.id}>
								<p>{item.brand} {item.packaged_name}</p>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}