'use server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// CREATE TABLE LOAFLOG
// id
// created
// updated
// leaven_temp
// leaven_start_time

const schema = z.object({
	leaven_temp: z.string(),
	leaven_start_time: z.string()
})


export async function createLogLoafAction(formData: FormData) {
	try {
		const validatedFields = schema.safeParse({
			leaven_temp: formData.get('leaven_temp'),
			leaven_start_time: formData.get('leaven_start_time')
		})

		// Return early if the form data is invalid
		if (!validatedFields.success) {
			throw new Error("invalid data to create log loaf entry, check types")
		}
		console.log(validatedFields)
	} catch (error) {
		console.log(error)
	}

	redirect("/loaf-log/1")
}