'use server'

import { CreateLogButton } from "../ui/loafer/components";
import LoafLog from "../ui/loafer/loafer-main";

export default async function Page() {

	return (
		<div className="flex flex-col justify-center items-center">
			<LoafLog />
			<CreateLogButton />
		</div>
	);
}
