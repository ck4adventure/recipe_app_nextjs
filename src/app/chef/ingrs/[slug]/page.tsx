import { GET_INGR_BY_SLUG } from "@/app/_lib/sqlQueriesChef";

export default async function Page({ params }: { params: { slug: string } }) {
	// fetch ingr and list all properties
	const ingr = await GET_INGR_BY_SLUG(params.slug);
	return (
		<div className=''>
			<div data-cy='ingrs-item'>
				<h1>{ingr.packaged_name}</h1>
				<p>Brand: {ingr.brand}</p>
			</div>
		</div>
	);
}