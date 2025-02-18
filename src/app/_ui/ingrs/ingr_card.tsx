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

	return (
		<Card className='w-[600px] m-8'>
			<CardHeader>
				<CardTitle className='capitalize [font-variant:petite-caps]'>{ingr.packaged_name}</CardTitle>
				<CardDescription className='text-lg capitalize'>{ingr.brand}</CardDescription>
			</CardHeader>
			<CardContent>
				<div>
					{/* <div className='flex my-2'>
						<p className='mr-2'>Brand Name: </p>
						<p>{ingr.brand}</p>
					</div>
					<div className='flex my-2'>
						<p className='mr-2'>Packaging Name:</p>
						<p>{ingr.packaged_name}</p>
					</div> */}
					<div className='flex my-2'>
						<p className='mr-2 [font-variant:petite-caps]'>On the label: </p>
						<p>{ingr.label_name}</p>
					</div>
					<div className='flex my-2'>
						<p className='mr-2 [font-variant:petite-caps]'>Ingredients:</p>
						<p>{ingr.ingredients.join(", ")}</p>
					</div>
					<div className='flex my-2'>
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