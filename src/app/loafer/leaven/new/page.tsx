// /leaven/new page has a form for entering the leaven amounts
// and it loads the current time into the display with a button to edit that as needed
// at the bottom a button to Create or Start Tracking
// action parses form by the schema, then awaits a sql query for the leaven ID
// redirects to a new page - /leaven/1
// it loads data about the leaven based on the id its given, display only
// can show the ticking upward clock of time since start
// button at bottom to mark as done and add temp (or update time if I am entering data late)
// once button at bottom is clicked it sets end time and temp
// page has a bool at top for end time presence

import LeavenCreateSection from '@/app/_ui/loafer/leaven_create_section';


export default function Page() {

	return (
		<div className='flex flex-col items-center'>
		<LeavenCreateSection />
		</div>
	)
}