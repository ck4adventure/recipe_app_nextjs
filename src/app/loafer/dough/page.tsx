import { NewDoughButton } from "@/app/_ui/loafer/components";
import { GET_LAST_N_DOUGHS } from "@/app/_lib/sqlQueriesLoafer";
import DoughTable from "@/app/_ui/loafer/dough_table";

export default async function Page() {
	const doughData = await GET_LAST_N_DOUGHS(5)
	return (
		<div className="flex flex-col items-center">
			<div>Dough Main Page</div>
			<DoughTable data={doughData}/>
			<NewDoughButton />
		</div>
	)
}