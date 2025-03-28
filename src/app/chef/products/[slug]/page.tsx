import { GET_PRODUCT_BY_SLUG, GET_PRODUCT_COMPONENTS_BY_ID } from "@/app/_lib/sqlQueriesChef";

interface ComponentObj {
	base: Component[],
	filling: Component[],
	topping: Component[],
}

interface Component {
	id: number;
	title: string;
	slug: string;
}

interface TransformedComponents {
	[key: string]: Component[];
}

export default async function Page({ params }: { params: { slug: string } }) {
	// Fetch product 
	const product: any = await GET_PRODUCT_BY_SLUG(params.slug);
	if (!product) {
		return (
			<div data-cy='product-item-page' className='flex flex-col items-center'>
				<h2 data-cy='product-item-not-found' className="font-bold text-lg text-center">Product Not Found</h2>
				<p className="text-center">The product you are looking for does not exist or has been removed.</p>
			</div>
		);
	}

	// Fetch components
	const components: any = await GET_PRODUCT_COMPONENTS_BY_ID(product.id);

	// Function to transform components into nested structure
	const transformComponents = (components: any[]): TransformedComponents => {
		return components.reduce((acc: TransformedComponents, comp) => {
			if (!acc[comp.component]) {
				acc[comp.component] = [];
			}
			acc[comp.component] = [...acc[comp.component], ...comp.recipes];
			return acc;
		}, {});
	};

	const transformedComponents = transformComponents(components);

	return (
		<div data-cy='product-item-page' className='flex flex-col items-center'>
			<h2 data-cy='product-name' className="font-semibold text-lg text-center">{product.name}</h2>
			<h4 data-cy='product-category' className="font-light text-sm text-center">{product.category}</h4>
			<h4 data-cy='product-description' className="font-light text-sm text-center">{product.description}</h4>

			<div className="max-w-[850px]">
				{/* Components Section */}
				{Object.keys(transformedComponents).length > 0 && (
					<div data-cy='product-components-section' className="m-4">
						<h3 className="font-semibold my-2">Components</h3>
						<ul>
							{Object.entries(transformedComponents).map(([componentType, recipes]) => (
								<li key={componentType} className="mb-4">
									<h4 className="font-medium capitalize">{componentType}</h4>
									<ul className="ml-4 list-disc">
										{recipes.map((recipe) => (
											<li key={recipe.id} className="list-none">
												<a href={`/chef/recipes/${recipe.slug}`}>{recipe.title}</a>
											</li>
										))}
									</ul>
								</li>
							))}
						</ul>
					</div>
				)}

				{/* Steps Section */}
				{product.steps?.length > 0 && (
					<div data-cy='product-method-section' className="m-4">
						<h3 className="font-semibold my-2">Method</h3>
						<ol className="list-decimal">
							{product.steps.map((step: any, i: number) => (
								<li data-cy='product-step' key={i} className="mx-4 my-2">
									{step}
								</li>
							))}
						</ol>
					</div>
				)}

				{/* Notes Section */}
				{product.notes?.length > 0 && (
					<div data-cy='product-notes-section' className="m-4">
						<div className="font-semibold my-2">Notes</div>
						<ul>
							{product.notes.map((note: string, i: number) => (
								<li key={i}>{note}</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}