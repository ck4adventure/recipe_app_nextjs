'use server'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { CREATE_LEAVEN, UPDATE_LEAVEN_END_TIME } from './sqlQueriesLoafer'
import { revalidatePath } from 'next/cache';
// Leaven
// table should exist with the following columns:
// leaven_ water_amt
// leaven_ water_temp
// leaven_ starter_amt
// leaven_ flour_amt
// leaven_ start_time
// leaven_ start_temp
// leaven_ end_time
// leaven_ end_temp

import { DoughFormData, LeavenFormData } from './definitions';

const leavenSchema = z.object({
	water_amt: z.number(),
	water_temp: z.number(),
	starter_amt: z.number(),
	flour_amt: z.number(),
	start_time: z.string(),
	start_temp: z.number(),
})

const doughSchema = z.object({
	water_amt: z.number(),
	water_temp: z.number(),
	leaven_amt: z.number(),
	leaven_id: z.number(),
	flour_amt: z.number(),
	flour_blend: z.string(),
	start_time: z.string(),
	start_temp: z.number(),
})


export async function createStartedLeaven(formData: LeavenFormData) {
	let id
	try {

		const vf = leavenSchema.safeParse({ ...formData })

		// Return early if the form data is invalid
		if (!vf.success) {
			console.log(vf.error)
			throw new Error("zod issue", vf.error)
		}
		const result = await CREATE_LEAVEN(vf.data.water_amt, vf.data.water_temp, vf.data.starter_amt, vf.data.flour_amt, vf.data.start_time, vf.data.start_temp)
		id = result.id
		if (!id) {
			throw new Error("something went wrong with leaven sql command")
		}
		console.log("id was: ", id)
	} catch (error) {
		console.log(error)
	}

	redirect(`/loafer/leaven/${id}`)
}

export const updateLeavenEndTime = async (id: number, endTime: string) => {
	const result = await UPDATE_LEAVEN_END_TIME(id, endTime)
	if (result) {
		// Revalidate the page to fetch the latest data
		revalidatePath(`/loafer/leaven/${result.id}`);
	}

}

export const doughCreateAction = async (formData: DoughFormData) => {
	let id
	try {
		const vf = doughSchema.safeParse({ ...formData })
		if (!vf.success) {
			console.log(vf.error)
			throw new Error("zod issue", vf.error)
		}
		// const result = await CREATE_DOUGH()
	} catch (error) {
		console.log(error)
	}

	// redirect(`/loafer/dough/${id}`)
	redirect(`/loafer/dough/1`)
}