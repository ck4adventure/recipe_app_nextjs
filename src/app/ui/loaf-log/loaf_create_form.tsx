'use client'
// import { createLogLoafAction } from "@/app/actions";
import React, { useState } from "react"

// export default function ClientComponent({
//   updateItemAction,
// }: {
//   updateItemAction: (formData: FormData) => void
// }) {
//   return <form action={updateItemAction}>{/* ... */}</form>
// }
export default function LoafLogCreateForm({
  createLogLoafAction,
}: {
  createLogLoafAction: (formData: FormData) => void
}) {

	// const [formData, setFormData] = useState({
	// 	leaven_temp: 75,
	// 	leaven_start_time: '',
	// })


	// const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
	// 	let { name, value } = e.target;
	// 	if (name == "leaven_start_time" || name == "bulk_rise_start_time" || name == "prove_start_time" || name == "bake_start_time") {
	// 		value = localToUTC(value);
	// 	}
	// 	setFormData({
	// 		...formData,
	// 		[name]: value
	// 	})
	// }

	// const handleSetTime = (fieldName: string) => {
	// 	const now = new Date();
	// 	const formattedDateTime = now.toISOString().slice(0, 16)
	// 	setFormData({
	// 		...formData,
	// 		[fieldName]: formattedDateTime
	// 	});
	// }

	// const localToUTC = (localDateTime: string) => {
	// 	const date = new Date(localDateTime);
	// 	return date.toISOString().slice(0, 16);
	// };

	// const utcToLocal = (utcDateTime: string) => {
	// 	if (!utcDateTime) return ''; // Handle empty or invalid date strings

	// 	const date = new Date(utcDateTime);
	// 	const tzOffset = date.getTimezoneOffset() * (60 * 1000 * 2); // offset in milliseconds
	// 	const newDate = date.getTime() - tzOffset;
	// 	const localISOTime = new Date(newDate).toISOString().slice(0, 16);
	// 	return localISOTime;
	// };

	// const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	// 	console.log("form submit is active")
	// 	e.preventDefault();
	// 	createLogLoafAction(formData);
	// }

	const adjustedTime = () => {
		const date = new Date();
		const tzOffset = date.getTimezoneOffset() * (60 * 1000);
		const newDate = date.getTime() - tzOffset;
		const localTime = new Date(newDate).toISOString().slice(0,16)
		return localTime
	}

	return (
		<form action={createLogLoafAction}>
			<div>It starts with some starter!</div>


			<div className="flex flex-row items-center">
				<label htmlFor="leaven_temp">Leaven Temp (F)</label>
				<input
					type="number"
					id="leaven_temp"
					name="leaven_temp"
					className="w-[50px]"
					defaultValue={70}
				/>
			</div>
			<div>

				<label htmlFor="leaven_start_time">Leaven Start Time</label>
				<input
					type="datetime-local"
					id="leaven_start_time"
					name="leaven_start_time"
					defaultValue={adjustedTime()}
				/>
				{/* <button type="button" onClick={() => handleSetTime('leaven_start_time')}>Now</button> */}
			</div>


			<div>
				<button type="submit">Start New Loaf Log</button>
			</div>


		</form>
	)
}