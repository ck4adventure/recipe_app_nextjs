import { CREATE_AUTHOR, GET_AUTHORS } from "@/app/_lib/sqlQueriesRecipes";
import { revalidatePath } from "next/cache";

export const createAuthorAndRefresh = async (authorName: string, isProfi: boolean) => {
	let authorID
	try {
		await CREATE_AUTHOR(authorName, isProfi)
	} catch (error) {
		throw error
	}
	// revalidatePath('/blue-binder/recipes/create');
}

export const getAuthors = async () => {
	try {
		return GET_AUTHORS();
	} catch (error) {
		throw error
	}
}

