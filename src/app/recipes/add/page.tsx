export default function Page() {
	return (
		<>
		<title>Recipes: Add</title>
		<main className="flex min-h-screen flex-col items-left justify-between p-24">
			<div>
				<h1>Add A recipe</h1>
			</div>
			<div>
				<form action="/recipes" method="post">

				</form>
			</div>
		</main>
		</>
	)
}