import Link from "next/link";

import { GET_PRODUCTS_BY_CAT } from "@/app/_lib/sqlQueriesChef";

export default async function Page() {
	// TODO fetch products and display
	const productResults = await GET_PRODUCTS_BY_CAT();
	return (
		<div data-cy='chef-products-index'>
			<div className="flex justify-center">
				<h1 className="text-2xl font-semibold">Current Products</h1>
			</div>

			<div data-cy='chef-products-by-category' className="m-8">
				{productResults && productResults.map((result, i) => (
					<div data-cy='category-section' key={i} className="m-8">
						<div className="font-medium capitalize">{result.category}</div>
						<ul className="mx-4">
							{result.products && result.products.map((product: any) => (
								<li data-cy='product-item' className="my-1" key={product.id}>
									<Link data-cy='product-link' href={`/chef/products/${product.slug}`} className="font-light text-sm"><p data-cy='product-title'>{product.name}</p></Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

		</div>
	);
}