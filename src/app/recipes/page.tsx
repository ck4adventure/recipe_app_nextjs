// Recipe Index Page
async function getData() {
  // const res = await fetch('https://api.example.com/...')
  // // The return value is *not* serialized
  // // You can return Date, Map, Set, etc.

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }

  // return res.json()
  return {
    recipes: [
      { id: 1, title: 'Recipe Title' },
      { id: 2, title: 'Recipe Title' },
      { id: 3, title: 'Recipe Title' }
    ]
  };
}

export default async function Page() {
  const data = await getData()
  return (
    <div>
      <title>Recipes</title>
      <main className='flex flex-col items-center'>
        <h1 className='m-4' data-cy='recipes-header'>Recipes</h1>
        <div className='m-4' data-cy='recipe-list-component'>
          <ul data-cy='recipe-list'>
            {data.recipes.map(recipe => (
              <li className="p-1" key={recipe.id}>{recipe.title}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}	