import LoaferCreateForm from "@/app/ui/loafer/loaf_create_form";
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { CREATE_LOAFER_LOG } from "../../../../lib/sqlQueriesLoafer";

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


export default function Page() {
	async function createLogLoafAction(formData: FormData) {
	'use server'
	let id
	try {
		const v = schema.safeParse({
			leaven_temp: formData.get('leaven_temp'),
			leaven_start_time: formData.get('leaven_start_time')
		})

		// Return early if the form data is invalid
		if (!v.success) {
			throw new Error("invalid data to create log loaf entry, check types")
		}
		const results = await CREATE_LOAFER_LOG(parseInt(v.data.leaven_temp), v.data.leaven_start_time)
		id = results.id
		// perform sql here and await returned id
	} catch (error) {
		console.log(error)
	}
	// redirect to returned id
	redirect(`/loafer/${id}`)
}

	return (
		<div className="flex flex-col items-center">
			<LoaferCreateForm createLogLoafAction={createLogLoafAction}/>
		</div>
	)
}