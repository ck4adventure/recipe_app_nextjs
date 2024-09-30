// Sample v0.2 log
// 1: Leaven Create
// Leaven Start Time 2024-09-29 08:45
// Leaven Water Temp 70F

// 2: Dough Create
// Dough Create Start Time 2024-09-29 16:00
// Water 700ML
// Water Temp 88F
// Flour Blend "Cottage"
// Ambient Temp at Start 78F

// 3: Dough Salt and Bulk Rise
// Dough Salt Time 16:40
// Dough Water Temp 70F
// Turns and Bulk Rise
// Ambient Temp at Start 78F
// 1st Turn: 17:15 76F
// 2nd Turn: 17:45 100F
// 3rd Turn: 18:20 90F
// 4th Turn: 18:50 90F
// 5th Turn: 19:30 ?
// 6th Turn: 8:15 110F
// 7th Turn: 8:45 100F
// 8th Turn: 9:15

// 4: Shape and Bench Rest
// Shaping Time expected 9:55
// Ambient Temp at Start 70?

// 5: Fold and Prove
// Folding Timestamp expected 10:20
// Ambient Temp at Start

// 5B: TODO: Optional Extended Prove
// Temp Switch Timestamp
// New Ambient Temp

// 6: Bake (for each loaf)
// Loaf Shape (Round, Oblong) Oblong
// Loaf Bake (Lodge, Dutch Oven, Tin, Freeform) Tins
// Bake Start Time
// Bake Temp
// Bake End Time

// Finished: Ratings
// Bake Height (1-5) 3 being average expected
// Inside Structure (dense, light, small bubble, large bubble)



export const loadSampleLogs = async (client) => {

	try {
		await client.sql`INSERT INTO loafer (leaven_temp, leaven_start_time) VALUES (70, '2024-09-25 21:00')`;
		await client.sql`INSERT INTO loafer (leaven_temp, leaven_start_time) VALUES (75, '2024-09-27 21:30')`;

	} catch (error) {
		console.error('Error loading loafer logs', error);
	}
}
