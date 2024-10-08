export const shorthandDate = (ts: string) => {
	const dateObj = new Date(ts)
	const offsetMS = dateObj.getTimezoneOffset() * 60000
	const newDateMS = dateObj.getTime() + offsetMS
	const newDate = new Date(newDateMS)
	const shortDate = newDate.getDate().toString()
	const shortMonth = newDate.getMonth().toString()
	const shortHour = newDate.getHours().toString()
	let shortMin = newDate.getMinutes().toString()
	if (shortMin.length < 2) {
		shortMin = '0' + shortMin
	}
	return `${shortMonth}/${shortDate} ${shortHour}:${shortMin}`
}