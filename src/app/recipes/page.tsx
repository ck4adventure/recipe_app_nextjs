import { getRecipeTitles } from "../lib/data";
// export const revalidate = 3600 // revalidate the data at most every hour


// Recipe Index Page should display a list of recipes
export default async function Page() {
  const data = await getRecipeTitles();
  return (
    <div>
      <title>Recipes</title>
      <main className='flex flex-col items-center'>
        <h1 className='m-4' data-cy='recipes-header'>Recipes</h1>
        <div className='m-4' data-cy='recipe-list-component'>
          <ul data-cy='recipe-list'>
            {data.rows.map((resObj: any, index: number) => (
                <li className="p-1" key={index}>{resObj.title}</li>
              ))}
          </ul>
        </div>
      </main>
    </div>
  );
}	