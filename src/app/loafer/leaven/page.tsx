import { GET_LAST_N_LEAVENS } from "@/app/_lib/sqlQueriesLoafer"
import { NewLeavenButton } from "@/app/_ui/loafer/components";
import LeavenTable from "@/app/_ui/loafer/leaven_table";


export default async function Page() {
	const results = await GET_LAST_N_LEAVENS(5);


	return (
		<div className="flex flex-col items-center">
			Leaven List View Page
			<LeavenTable results={results}/>
			<div>
				<NewLeavenButton />
			</div>
		</div>
	)
}

{/* <Link href={`/loafer/leaven/${res.id}`}></Link> */ }