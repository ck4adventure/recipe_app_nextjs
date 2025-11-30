'use client';
import Link from 'next/link';

// CategoryCard takes a category and array of recipes and displays them in a list

const CategoryCard = ({ category, categoryRecipes }: {
	category: string,
	categoryRecipes: {
		ids: number[],
		titles: string[],
		slugs: string[],
		count?: number,
	}
}) => {
	const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

	return (
		<div data-cy='category-card' className="m-4 border-2 rounded-md p-2 min-h-16">
			<h2 data-cy='category-name' className="font-bold">
				<Link
					data-cy='category-link'
					href={`/blue-binder/categories/${encodeURI(category)}`}
				>
					{formattedCategory}
				</Link>
				{typeof categoryRecipes.count === 'number' && (
					<span className="ml-2 text-xs text-gray-500">({categoryRecipes.count} recipes)</span>
				)}
			</h2>
			<ul data-cy='recipe-list'>
				{categoryRecipes.ids.map((id, index) => (
					<li key={id || index} className="font-light m-2">
						<Link
							data-cy='recipe-link'
							href={`/blue-binder/recipes/${encodeURI(categoryRecipes.slugs[index])}`}
						>
							{categoryRecipes.titles[index]}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CategoryCard;