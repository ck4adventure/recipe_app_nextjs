import CategoryCard from "./category_card";

// Expects data as an array of category objects with recipe arrays (from new SQL query)
const CategoryView = ({ data }: { data: any[] }) => {
	return (
		<div data-cy='recipe-categories' className="w-full md:w-1/2 flex flex-col justify-center">
			{data.map((category, index) => (
				<CategoryCard
					key={category.category_id || index}
					category={category.category_name}
					categoryRecipes={{
						ids: category.recipe_ids || [],
						titles: category.recipe_titles || [],
						slugs: category.recipe_slugs || [],
						count: category.recipe_count ? Number(category.recipe_count) : 0,
					}}
				/>
			))}
		</div>
	);
};

export default CategoryView;