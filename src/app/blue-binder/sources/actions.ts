'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { GET_SOURCES, CREATE_SOURCE, UPDATE_SOURCE } from "@/app/_lib/sqlQueriesRecipes"


export const getSources = async () => {
	const results = await GET_SOURCES();
	return results
}

export const createSource = async (title: string, source_type: string, url: string, singleAuthor: boolean) => {
	try {
		console.log("about to create source in db: ", title);
		await CREATE_SOURCE(title, source_type, url, singleAuthor);
	} catch (error) {
		console.error('Error:', error);
		
	}
}
export const createSourceAndRedirect = async (title: string, source_type: string, url: string, singleAuthor: boolean) => {
	try {
				console.log("about to create source in db: ", title);
		await CREATE_SOURCE(title, source_type, url, singleAuthor);
	} catch (error) {
		console.error('Error:', error);
	}
		revalidatePath('/blue-binder/sources')
		redirect(`/blue-binder/sources`);
}
export const updateSourceAndRedirect = async (sourceid: number, title: string, source_type: string, url: string, singleAuthor: boolean) => {
	try {
		await UPDATE_SOURCE(sourceid, title, source_type, url, singleAuthor);
	} catch (error) {
		console.error('Error:', error);
	}
		revalidatePath('/blue-binder/sources')
		redirect(`/blue-binder/sources`);
}