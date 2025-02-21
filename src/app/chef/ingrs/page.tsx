import { GET_ALL_INGRS, GET_INGRS_AND_CATS } from "@/app/_lib/sqlQueriesChef";
import Link from "next/link";


export default async function Page() {
	// fetch ingrs and group by first letter or category, showing first 5 of each
	// TODO Create New QUERY to Group by Cat
	// const ingrs = await GET_ALL_INGRS();
	const groupedIngrs = await GET_INGRS_AND_CATS();


	return (
		<div className=''>
			<div data-cy='ingrs-index'>
				<div className="mx-8 my-1 flex justify-center">
					<h1>Ingredients</h1>
				</div>
				<div className="flex flex-wrap">
					{groupedIngrs && groupedIngrs.map(obj => (
						<div className="m-4 max-w-[250px]" key={obj.category}>
							<div className="font-medium capitalize">{obj.category}</div>
							<div>{obj.items.map((item: any) => (
								<div key={item.id} className="my-0">
									<Link href={`/chef/ingrs/${item.slug}`} className="capitalize font-light text-sm">{item.packaged_name}</Link>
								</div>
							))}</div>
						</div>
					))}

				</div>
			</div>
		</div>
	);
}