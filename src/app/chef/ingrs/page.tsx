import { GET_INGRS_AND_CATS } from "@/app/_lib/sqlQueriesChef";
import Link from "next/link";


export default async function Page() {
	// fetch ingrs and group by first letter or category, showing first 5 of each
	// TODO Create New QUERY to Group by Cat
	// const ingrs = await GET_ALL_INGRS();
	const groupedIngrs = await GET_INGRS_AND_CATS();


	return (
		<div className=''>
			<div data-cy='chef-ingrs-index'>
				<div className="flex justify-center">
					<h1 className="text-2xl font-semibold">Chef&apos;s Ingredients Page</h1>
				</div>
				<div data-cy='chef-ingrs-by-category' className="flex flex-wrap">
					{groupedIngrs && groupedIngrs.map(obj => (
						<div data-cy='category-section' className="m-4 max-w-[250px]" key={obj.category}>
							<div className="font-medium capitalize">{obj.category}</div>
							<div>{obj.items.map((item: any) => (
								<div data-cy='ingr-item' key={item.id} className="my-0">
									<Link data-cy='ingr-link' href={`/chef/ingrs/${item.slug}`} className="capitalize font-light text-sm"><p data-cy='ingr-packaged-name'>{item.packaged_name}</p></Link>
								</div>
							))}</div>
						</div>
					))}

				</div>
			</div>
		</div>
	);
}