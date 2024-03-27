'use client'

const ListView = ({data}: {data: any[]}) => {
	return (
		<div data-cy='recipe-categories' className="m-2 grid grid-flow-row sm:grid-cols-2 md:grid-cols-3">
			<ul>
			{data.map((recipe: any, index: number) => {
				return (
					<li key={index}>{recipe.recipe_title}</li>
				);
			})}
			</ul>
		</div>
	);
}

export default ListView;