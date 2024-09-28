'use server'

import { CreateLogButton } from "../ui/loaf-log/components";
import LoafLog from "../ui/loaf-log/loaf-log-main";

export default async function Page() {

	return (
		<div className="flex flex-col justify-center items-center">
			<LoafLog />
			<CreateLogButton />
		</div>
	);
}
