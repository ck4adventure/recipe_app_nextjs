import { GET_INGR_BY_SLUG } from "@/app/_lib/sqlQueriesChef";
import { IngrCard, Ingr } from "@/app/_ui/ingrs/ingr_card";

export default async function Page({ params }: { params: { slug: string } }) {
	// fetch ingr and list all properties
	const ingr = await GET_INGR_BY_SLUG(params.slug) as Ingr;
	return (
		<div className='flex justify-center'>
			<IngrCard ingr={ingr} />
		</div>
	);
}