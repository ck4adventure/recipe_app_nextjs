'use client'
import React, { useState } from "react"

// create an enum to hold the available loaf type options
enum LoafType {
	White = "White",
	Cottage = "Cottage",
	Wheat = "Wheat",
	Rye = "Rye",
	Complet = "Complet",
	Integraal = "Integraal"
}

export default function BakingLogInputForm() {
	const [formData, setFormData] = useState({
		loaf_type: '',
		hydration: 70,
		leaven_start_time: '',
		bulk_rise_start_time: '',
		prove_start_time: '',
		bake_start_time: ''
	})
	const [isSubmitted, setIsSubmitted] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		let { name, value } = e.target;
		if (name == "leaven_start_time" || name == "bulk_rise_start_time" || name == "prove_start_time" || name == "bake_start_time") {
			value = localToUTC(value);
		}
		setFormData({
			...formData,
			[name]: value
		})
	}

	const handleSetTime = (fieldName: string) => {
		const now = new Date();
		const formattedDateTime = now.toISOString().slice(0, 16)
		setFormData({
			...formData,
			[fieldName]: formattedDateTime
		});
	}

	const localToUTC = (localDateTime: string) => {
		const date = new Date(localDateTime);
		return date.toISOString().slice(0, 16);
	};

	const utcToLocal = (utcDateTime: string) => {
		if (!utcDateTime) return ''; // Handle empty or invalid date strings

		const date = new Date(utcDateTime);
		const tzOffset = date.getTimezoneOffset() * (60000 * 2); // offset in milliseconds
		const newDate = date.getTime() - tzOffset;
		const localISOTime = new Date(newDate).toISOString().slice(0, 16);
		return localISOTime;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		console.log("form submit is active")
		e.preventDefault();
		setIsSubmitted(true)
		console.log("data to be created: ", formData)
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>Create a new entry</div>
			<div>
				<label htmlFor="loaf_type">Loaf Type</label>
				<select id="loaf_type" name="loaf_type" value={formData.loaf_type} onChange={handleChange}>
					<option value="">Select a type</option>
					{Object.values(LoafType).map((type) => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</select>
			</div>
			<div>
				<label htmlFor="hydration">Hydration</label>
				<input
					type="number"
					id="hydration"
					name="hydration"
					value={formData.hydration}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor="leaven_start_time">Leaven Start Time</label>
				<input
					type="datetime-local"
					id="leaven_start_time"
					name="leaven_start_time"
					value={utcToLocal(formData.leaven_start_time)}
					onChange={handleChange}
				/>
				<button type="button" onClick={() => handleSetTime('leaven_start_time')}>Set to now</button>
			</div>
			<div>
				<label htmlFor="bulk_rise_start_time">Bulk Rise Start Time</label>
				<input
					type="datetime-local"
					id="bulk_rise_start_time"
					name="bulk_rise_start_time"
					value={utcToLocal(formData.bulk_rise_start_time)}
					onChange={handleChange}
				/>
				<button type="button" onClick={() => handleSetTime('bulk_rise_start_time')}>Set to now</button>
			</div>
			<div>
				<label htmlFor="prove_start_time">Shaped Prove Start Time</label>
				<input
					type="datetime-local"
					id="prove_start_time"
					name="prove_start_time"
					value={utcToLocal(formData.prove_start_time)}
					onChange={handleChange}
				/>
				<button type="button" onClick={() => handleSetTime('prove_start_time')}>Set to now</button>

			</div>
			<div>
				<label htmlFor="bake_start_time">Bake Start Time</label>
				<input
					type="datetime-local"
					id="bake_start_time"
					name="bake_start_time"
					value={utcToLocal(formData.bake_start_time)}
					onChange={handleChange}
				/>
				<button type="button" onClick={() => handleSetTime('bake_start_time')}>Set to now</button>

			</div>
			<button type="submit">{isSubmitted ? "Update" : "Create"}</button>


		</form>
	)
}