interface RecipeListProps {
	recipeTitles: string[];
}

export const RecipeList = (props: RecipeListProps) => {
	return (
		<div>
			<ul>
				{props.recipeTitles.map((title, index) => (
					<li key={index}>{title}</li>
				))}
			</ul>
		</div>
	);
};

export default RecipeList;