

export default async function Page({ params }: { params: { id: string } }) {
	// this prolly needs to be more like an effect? maybe it is already
	// so first try and load any available data for this entry, which we'll likely continue updating
	// const logData = await GET_LOAFER_LOG_DETAILS(params.id)

	return (
		<div>
			<div>Leaven #{params.id}</div>
		</div>
	)
}