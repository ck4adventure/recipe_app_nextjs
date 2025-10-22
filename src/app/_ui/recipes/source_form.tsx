// RecipeForm is a client component that displays a form
// with a recipe title input and a select dropdown to choose a category
// it should manage the state and submit the form
'use client'
import { createSourceAndRedirect, updateSourceAndRedirect } from "../../blue-binder/sources/actions";
import { useState } from "react";
import { SOURCE_TYPES } from "../../../../types";

import { Card } from "@/components/ui/card";

export const SourceForm = ({ source }: { source?: any }) => {
	const [sourceTitle, setSourceTitle] = useState<string>(source ? source.title : '');
	const [sourceType, setSourceType] = useState<string>(source ? source.source_type : false);
	const [sourceURL, setSourceURL] = useState<string>(source ? source.source_url : false);
	const [sourceSingleAuthor, setSourceSingleAuthor] = useState<boolean>(source ? source.single_author : true);

	const handleSourceTitleChange = (value: string) => {
		setSourceTitle(value);
	}

	const handleSourceTypeChange = (value: string) => {
		setSourceType(value);
	}

	const handleSourceURLChange = (value: string) => {
		//todo ensure string is safe
		const trimmed = value.trim();
		setSourceURL(trimmed);
	}

	const handleSourceSingleAuthorChange = (value: boolean) => {
		setSourceSingleAuthor(value);
	}


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (source) {
				await updateSourceAndRedirect(source.id, sourceTitle, sourceType, sourceURL, sourceSingleAuthor);
			} else {
				await createSourceAndRedirect(sourceTitle, sourceType, sourceURL, sourceSingleAuthor);
			}
		} catch (error) {
			console.log("error: ", error)
		}
	};

	return (
		<Card className="w-[700px] m-4 p-8 shadow">

			<h1 className="my-2 font-bold">{source ? 'Update' : 'Add'} Source</h1>
			<form data-cy='source-form' className="my-4 flex flex-col justify-center" onSubmit={handleSubmit}>
				{/* Source Title */}
				<div className="my-2">
					<label className='flex items-center' htmlFor="source-title">Source Title
						<input
							id="source-title"
							data-cy='source-title-input'
							className="grow border-b border-slate-300"
							onChange={e => handleSourceTitleChange(e.target.value)}
							value={sourceTitle}>
						</input>
					</label>
				</div>
				{/* sourceTypeSelect */}
				<label htmlFor="source-type-select" className="w-[350px] flex justify-between items-center">Source Type
					<select
						id="source-type-select"
						className="w-[250px]"
						onChange={e => handleSourceTypeChange(e.target.value)}
						data-cy='recipe-source-select'
						value={sourceType}
					>
						{SOURCE_TYPES.map((v: string, i: number) => (
							<option
								key={`source-type-${i}`}
								value={v}>
								{v}
							</option>))}
					</select>
				</label>

				{/* if web, url */}
				<label className='flex items-center' htmlFor="source-url">Source Url
					<input
						id="source-url"
						data-cy='source-url-input'
						className="grow border-b border-slate-300"
						onChange={e => handleSourceURLChange(e.target.value)}
					>
					</input>
				</label>

				{/* singleAuthor */}
				<div className="grid gap-3">
					<label htmlFor="singleAuthor-select" className="w-[350px] flex justify-between items-center">Single Author?
						<select
							id="singleAuthor-select"
							className="w-[225px]"
							data-cy='singleAuthor-select'
							onChange={e => handleSourceSingleAuthorChange(JSON.parse(e.target.value))}
							value={sourceSingleAuthor.toString()}
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
						data-cy='source-submit-button'
					>{source ? 'Update' : 'Add'} Source</button>
				</div>
			</form>
		</Card>
	);
}