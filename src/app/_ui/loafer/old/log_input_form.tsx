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

enum LoafShape {
	BannetonRound = "Banneton - Round",
	BannetonOblong = "Banneton - Oblong",
	LoafTin = "Loaf Tin"
}

export default function BakingLogInputForm() {
	const [formData, setFormData] = useState({
		loaf_type: '',
		hydration: 70,
		quantity: 2,
		leaven_temp: 75,
		leaven_start_time: '',
		dough_start_time: '',
		dough_salt_time: '',
		bulk_rise_temp: 75,
		bulk_rise_start_time: '',
		prove_temp: 75,
		prove_start_time: '',
		loaf_1_shape: '',
		l1_bake_start_time: '',
		l1_bake_end_time: '',
		loaf_2_shape: '',
		l2_bake_start_time: '',
		l2_bake_end_time: ''
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
		const tzOffset = date.getTimezoneOffset() * (60 * 1000 * 2); // offset in milliseconds
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
			<div className="flex flex-row items-center">
				<label htmlFor="loaf_type">Loaf Type</label>
				<select
					id="loaf_type"
					name="loaf_type"
					value={formData.loaf_type}
					onChange={handleChange}
				>
					<option value="">Select a type</option>
					{Object.values(LoafType).map((type) => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</select>

				<label htmlFor="hydration">Hydration %</label>
				<input
					type="number"
					id="hydration"
					name="hydration"
					value={formData.hydration}
					onChange={handleChange}
					className="w-[50px]"
				/>

				<label htmlFor="quantity">Quantity</label>
				<input
					type="number"
					id="quantity"
					name="quantity"
					value={formData.quantity}
					onChange={handleChange}
					className="w-[50px]"
				/>
			</div>

			<div className="flex flex-row items-center">
				<label htmlFor="leaven_temp">Leaven Temp (F)</label>
				<input
					type="number"
					id="leaven_temp"
					name="leaven_temp"
					value={formData.leaven_temp}
					onChange={handleChange}
					className="w-[50px]"
				/>

				<label htmlFor="leaven_start_time">Leaven Start Time</label>
				<input
					type="datetime-local"
					id="leaven_start_time"
					name="leaven_start_time"
					value={utcToLocal(formData.leaven_start_time)}
					onChange={handleChange}
				/>
				<button type="button" onClick={() => handleSetTime('leaven_start_time')}>Now</button>
			</div>

			<div className="flex flex-row items-center">
				<label htmlFor="dough_start_time">Dough Start Time</label>
				<input
					type="datetime-local"
					id="dough_start_time"
					name="dough_start_time"
					value={utcToLocal(formData.dough_start_time)}
					onChange={handleChange}
				/>
				<button type="button" onClick={() => handleSetTime('dough_start_time')}>Now</button>
			</div>
			<div>
				<label htmlFor="dough_salt_time">Dough Salt Time</label>
				<input
					type="datetime-local"
					id="dough_salt_time"
					name="dough_salt_time"
					value={utcToLocal(formData.dough_salt_time)}
					onChange={handleChange}
				/>
				<button type="button" onClick={() => handleSetTime('dough_salt_time')}>Now</button>

			</div>
			<div className="flex flex-row items-center">
				<label htmlFor="bulk_rise_temp">Bulk Rise Temp (F)</label>
				<input
					type="number"
					id="bulk_rise_temp"
					name="bulk_rise_temp"
					value={formData.bulk_rise_temp}
					onChange={handleChange}
					className="w-[50px]"
				/>
				<label htmlFor="bulk_rise_start_time">Bulk Rise Start Time</label>
				<input
					type="datetime-local"
					id="bulk_rise_start_time"
					name="bulk_rise_start_time"
					value={utcToLocal(formData.bulk_rise_start_time)}
					onChange={handleChange}
				/>
				<button type="button" onClick={() => handleSetTime('bulk_rise_start_time')}>Now</button>
			</div>
			<div className="flex flex-row items-center">
				<label htmlFor="prove_temp">Shaped Prove Temp (F)</label>
				<input
					type="number"
					id="prove_temp"
					name="prove_temp"
					value={formData.prove_temp}
					onChange={handleChange}
					className="w-[50px]"
				/>


				<label htmlFor="prove_start_time">Shaped Prove Start Time</label>
				<input
					type="datetime-local"
					id="prove_start_time"
					name="prove_start_time"
					value={utcToLocal(formData.prove_start_time)}
					onChange={handleChange}
				/>
				<button type="button" onClick={() => handleSetTime('prove_start_time')}>Now</button>

			</div>

			<div className="flex flex-row items-center">
				<label htmlFor="loaf_1">Loaf 1 Shape</label>
				<select
					id="loaf_1"
					name="loaf_1"
					value={formData.loaf_1_shape}
					onChange={handleChange}

				>
					{Object.values(LoafShape).map((type) => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</select>
				<label htmlFor="l1_bake_start_time">Loaf 1 Bake Start Time</label>
				<input
					type="datetime-local"
					id="l1_bake_start_time"
					name="l1_bake_start_time"
					value={utcToLocal(formData.l1_bake_start_time)}
					onChange={handleChange}
				/>
				<button type="button" onClick={() => handleSetTime('l1_bake_start_time')}>Now</button>


				<label htmlFor="l1_bake_end_time">loaf 1 Bake End Time</label>
				<input
					type="datetime-local"
					id="l1_bake_end_time"
					name="l1_bake_end_time"
					value={utcToLocal(formData.l1_bake_end_time)}
					onChange={handleChange}
				/>
				<button type="button" onClick={() => handleSetTime('l1_bake_end_time')}>Now</button>

			</div>

			<div>
				<label htmlFor="loaf_2_shape">Loaf 2 Shape</label>
				<select
					id="loaf_2_shape"
					name="loaf_2_shape"
					value={formData.loaf_2_shape}
					onChange={handleChange}

				>
					{Object.values(LoafShape).map((type) => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</select>
				<label htmlFor="l2_bake_start_time">Loaf 2 Bake Start Time</label>
				<input
					type="datetime-local"
					id="l2_bake_start_time"
					name="l2_bake_start_time"
					value={utcToLocal(formData.l2_bake_start_time)}
					onChange={handleChange}
				/>
				<button type="button" onClick={() => handleSetTime('l2_bake_start_time')}>Now</button>


				<label htmlFor="l2_bake_end_time">loaf 2 Bake End Time</label>
				<input
					type="datetime-local"
					id="l2_bake_end_time"
					name="l2_bake_end_time"
					value={utcToLocal(formData.l2_bake_end_time)}
					onChange={handleChange}
				/>
				<button type="button" onClick={() => handleSetTime('l2_bake_end_time')}>Now</button>

			</div>


			<div>
				<button type="submit">{isSubmitted ? "Update" : "Create"}</button>
			</div>


		</form>
	)
}