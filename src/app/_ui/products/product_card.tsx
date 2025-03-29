import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { RecipeComponent } from '@/app/chef/products/[slug]/page';
import Link from 'next/link';
export interface Product {
	id: string;
	slug: string;
	category: string;
	name: string;
	description: string;
	ingredients_label: string[];
	allergens_label: string[];
	components: {
		base: RecipeComponent[],
		filling: RecipeComponent[],
		topping: RecipeComponent[],
	};
	steps?: string[];
	notes?: string[];
}
//  'milk', 'eggs', 'fish', 'shellfish', 'tree nuts', 
//  'peanuts', 'wheat', 'soy', 'sesame'
// const allergens = ['milk', 'eggs', 'fish', 'shellfish', 'tree nuts', 'peanuts', 'wheat', 'soy', 'sesame'];

export const ProductCard = ({ product }: { product: Product }) => {
	if (!product) {
		return (
			<div data-cy='product-item' className='flex flex-col items-center'>
				<h2 data-cy='product-item-not-found' className="font-bold text-lg text-center">Product Not Found</h2>
				<p className="text-center">The product you are looking for does not exist or has been removed.</p>
			</div>
		);
	}
	return (
		<Card data-cy='product-item' className='w-[600px] m-8 border-8'>
			<CardHeader className='text-center'>
				<CardTitle data-cy='product-packaged-name' className='capitalize [font-variant:petite-caps]'>{product.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<div>
					<div className='flex my-2'>
						<p className='mr-2 [font-variant:petite-caps]'>Description</p>
						<p data-cy='product-category'>{product.description}</p>
					</div>
					<div className='flex my-2'>
						<p className='mr-2 [font-variant:petite-caps]'>Category</p>
						<p data-cy='product-category'>{product.category}</p>
					</div>
					<div className='flex flex-col my-2'>
						<p className='mr-2 [font-variant:petite-caps]'>On the label </p>
						<p data-cy='product-label-name'>{product.ingredients_label.join(", ")}</p>
					</div>
					<div className='flex flex-col my-2'>
						<p className='mr-2 [font-variant:petite-caps]'>Allergen label </p>
						<p data-cy='product-label-name'>{product.allergens_label.filter(item => item != null).join(", ")}</p>
					</div>
					<div data-cy='product-ingredients-section' className='flex flex-col my-2'>
						<p className='mr-2 [font-variant:petite-caps]'>Components</p>

						<div className='flex flex-row'>
							<p className='mr-2 [font-variant:petite-caps]'>Base:</p>
							<div data-cy='product-base'>
								{product.components.base && product.components.base.map((recipeData: RecipeComponent) => {
									return (
										<div key={recipeData.id}>
											<Link href={`/chef/recipes/${recipeData.slug}`}>{recipeData.title}</Link>
										</div>
									);
								})}
							</div>
						</div>

						<div className='flex flex-row'>
							<p className='mr-2 [font-variant:petite-caps]'>Filling:</p>
							<div data-cy='product-filling'>
								{product.components.filling && product.components.filling.map((recipeData: RecipeComponent) => {
									return (
										<div key={recipeData.id}>
											<Link href={`/chef/recipes/${recipeData.slug}`}>{recipeData.title}</Link>
										</div>
									);
								})}
							</div>
						</div>

						<div className='flex flex-row'>
							<p className='mr-2 [font-variant:petite-caps]'>Topping:</p>
							<div data-cy='product-topping'>
								{product.components.topping && product.components.topping.map((recipeData: RecipeComponent) => {
									return (
										<div key={recipeData.id}>
											<Link href={`/chef/recipes/${recipeData.slug}`}>{recipeData.title}</Link>
										</div>
									);
								})}
								{!product.components.topping && (
									<div>none</div>
								)}
							</div>
						</div>
					</div>

				</div>
				{/* Steps Section */}
				{/* {product.steps?.length > 0 && (
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
				)} */}

				{/* Notes Section
				{product.notes?.length > 0 && (
					<div data-cy='product-notes-section' className="m-4">
						<div className="font-semibold my-2">Notes</div>
						<ul>
							{product.notes.map((note: string, i: number) => (
								<li key={i}>{note}</li>
							))}
						</ul>
					</div>
				)} */}

			</CardContent>
		</Card>
	)
}