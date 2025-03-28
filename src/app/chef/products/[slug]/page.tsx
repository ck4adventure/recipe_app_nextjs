import { GET_PRODUCT_ALLERGENS, GET_PRODUCT_BY_SLUG, GET_PRODUCT_COMPONENTS_BY_ID } from "@/app/_lib/sqlQueriesChef";
import { ProductCard } from "@/app/_ui/products/product_card";

export interface ComponentObj {
	base: RecipeComponent[],
	filling: RecipeComponent[],
	topping: RecipeComponent[],
}

export interface RecipeComponent {
	id: number;
	title: string;
	slug: string;
}

interface TransformedComponents {
	[key: string]: RecipeComponent[];
}

export default async function Page({ params }: { params: { slug: string } }) {
	// Fetch product 
	let product: any = await GET_PRODUCT_BY_SLUG(params.slug);
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

	const labels = await GET_PRODUCT_ALLERGENS(product.id);

	product["components"] = transformedComponents;
	product["ingredients_label"] = labels.ingredient_labels;
	product["allergens_label"] = labels.allergens;

	return (
		<div data-cy='product-item-page' className='flex flex-col items-center'>
			<ProductCard product={product}/>
		</div>
	);
}