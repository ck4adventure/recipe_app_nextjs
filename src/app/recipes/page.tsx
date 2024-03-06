// Recipe Index Page
export default function Page() {
  return (
    <div>
      <title>Recipes</title>
      <main className='flex flex-col items-center'>
        <h1 className='m-4' data-cy='recipes-header'>Recipes</h1>
        <div className='m-4' data-cy='recipe-list-component'>
          <ul data-cy='recipe-list'>
            <li className="p-1">Recipe Title</li>
            <li className="p-1">Recipe Title</li>
            <li className="p-1">Recipe Title</li>
          </ul>
        </div>
      </main>
    </div>
  );
}	