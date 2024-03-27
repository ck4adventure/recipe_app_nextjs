'use client'

const ListView = ({data}: {data: any[]}) => {
	return (
		<div data-cy='recipes-list' className="m-2">
			<ul>
			{data.map((recipe: any, index: number) => {
				return (
					<li className='min-w-8 my-1' key={index}>{recipe.recipe_title}</li>
				);
			})}
			</ul>
		</div>
	);
}

export default ListView;