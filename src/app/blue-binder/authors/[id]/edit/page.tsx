import { notFound } from "next/navigation";

import { GET_AUTHOR_BY_ID } from "@/app/_lib/sqlQueriesRecipes";
import { AuthorForm } from "@/app/_ui/recipes/author_form";

export default async function Page({ params }: { params: { id: string } }) {
		const authorID = Number(params.id);
		if (Number.isNaN(authorID)) notFound();

	const authorData: any = await GET_AUTHOR_BY_ID(authorID);
		if (!authorData) {
		// source not found in DB
		return notFound();
	}

	return (
		<div className="flex flex-col items-center">
			<AuthorForm  author={authorData}/>
		</div>
	)
}