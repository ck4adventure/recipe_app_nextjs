// RecipeForm is a client component that displays a form
// with a recipe title input and a select dropdown to choose a category
// it should manage the state and submit the form
'use client'
import { createAuthorAndRedirect, updateAuthorAndRedirect } from "../../blue-binder/recipes/actions";
import { useState } from "react";

import { Card } from "@/components/ui/card";

export const AuthorForm = ({ author }: { author?: any}) => {
	const [authorName, setAuthorName] = useState<string>(author ? author.name : '');
	const [isProfi, setIsProfi] = useState<boolean>(author ? author.is_profi : false);


	const handleNameChange = (value: string) => {
		setAuthorName(value);
	}
	
	const handleProfiChange = (value: boolean) => {
		setIsProfi(value);
	}


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (author) {
			await updateAuthorAndRedirect(author.id, authorName, isProfi);
		} else {
			await createAuthorAndRedirect(authorName, isProfi);
		}
	};

	return (
		<Card className="w-[700px] m-4 p-8 shadow">

			<h1 className="my-2 font-bold">{author ? 'Update' : 'Add'} Author</h1>
			<form data-cy='author-form' className="my-4 flex flex-col justify-center" onSubmit={handleSubmit}>
				{/* Author Name */}
				<div className="my-2">
					<label className='flex items-center' htmlFor="author-name">Author&apos;s Name
						<input
							id="author-name"
							data-cy='author-name-input'
							className="grow border-b border-slate-300"
							onChange={e => handleNameChange(e.target.value)}
							value={authorName}>
						</input>
					</label>
				</div>
				{/* isProfi Select */}
				<div className="my-2">
					<label htmlFor="isProfi-select" className="w-[350px] flex justify-between items-center">Is Professional?
						<select
							id="isProfi-select"
							className="w-[225px]"
							onChange={e => handleProfiChange( JSON.parse(e.target.value))}
							data-cy='isProfi-select'
							value={isProfi.toString()}
						>
								<option
									key={"true"}
									value={"true"}>
									True
								</option>
								<option
									key={"false"}
									value={"false"}>
									False
								</option>
						</select>
					</label>
				</div>
		
				{/* Submit button */}
				<div className="flex justify-center my-4">
					<button
						type="submit"
						className="my-4"
						data-cy='author-submit-button'
					>{author ? 'Update' : 'Add'} Author</button>
				</div>
			</form>
		</Card>
	);
}