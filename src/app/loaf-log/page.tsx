'use server'

import { CreateLogButton } from "../ui/loaf-log/components";
import LoafLog from "../ui/loaf-log/loaf-log-main";

export default async function Page() {

	return (
		<div>
			<LoafLog />
			<CreateLogButton />
		</div>
	);
}
