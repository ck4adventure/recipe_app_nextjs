import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export interface Ingr {
	id: string;
	slug: string;
	category: string;
	brand: string;
	packaged_name: string;
	label_name: string;
	ingredients: string[];
	allergens: string[];
}
//  'milk', 'eggs', 'fish', 'shellfish', 'tree nuts', 
//  'peanuts', 'wheat', 'soy', 'sesame'
const allergens = ['milk', 'eggs', 'fish', 'shellfish', 'tree nuts', 'peanuts', 'wheat', 'soy', 'sesame'];

export const IngrCard = ({ ingr }: { ingr: Ingr }) => {
	// need to take list of allergens which might be null
	// and map that into an array of all the allergens
	// only those from the items list should show checkboxes
	if (!ingr) {
		return (
			<div data-cy='ingr-item' className='flex flex-col items-center'>
				<h2 data-cy='ingr-item-not-found'className="font-bold text-lg text-center">Ingredient Not Found</h2>
				<p className="text-center">The ingredient you are looking for does not exist or has been removed.</p>
			</div>
		);
	}
	return (
		<Card data-cy='ingr-item' className='w-[600px] m-8 border-8'>
			<CardHeader>
				<CardTitle data-cy='ingr-packaged-name' className='capitalize [font-variant:petite-caps]'>{ingr.packaged_name}</CardTitle>
				<CardDescription data-cy='ingr-brand-name' className='text-lg capitalize'>{ingr.brand}</CardDescription>
			</CardHeader>
			<CardContent>
				<div>
					<div className='flex my-2'>
						<p className='mr-2 [font-variant:petite-caps]'>Category: </p>
						<p data-cy='ingr-category'>{ingr.category}</p>
					</div>
					<div className='flex my-2'>
						<p className='mr-2 [font-variant:petite-caps]'>On the label: </p>
						<p data-cy='ingr-label-name'>{ingr.label_name}</p>
					</div>
					<div data-cy='ingr-ingredients-section' className='flex my-2'>
						<p className='mr-2 [font-variant:petite-caps]'>Ingredients:</p>
						<p>{ingr.ingredients.join(", ")}</p>
					</div>
					<div data-cy='ingr-allergens-section' className='flex my-2'>
						<p className='mr-2 [font-variant:petite-caps]'> Allergens: </p>
						<div className='flex flex-wrap'>
							{allergens && allergens.map(item => (
								<div key={item}>
									<input type="checkbox" id={item} name={item} checked={ingr.allergens?.includes(item)} readOnly/>
									<label htmlFor={item}>{item}</label>
								</div>
							))}
						</div>
					</div>

				</div>

			</CardContent>
		</Card>
	)
}