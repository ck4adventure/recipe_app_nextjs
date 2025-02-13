import { GET_INGR_BY_SLUG } from "@/app/_lib/sqlQueriesChef";

export default async function Page({ params }: { params: { slug: string } }) {
	// fetch ingr and list all properties
	const ingr = await GET_INGR_BY_SLUG(params.slug);
	return (
		<div className=''>
			<div data-cy='ingrs-item'>
				<h1>Ingredients Item Page</h1>
				{/* form field with all data for editing */}
			</div>
		</div>
	);
}