'use client'

// todo update baking log to take data from server component page it lives on
export default function LoafLog() {
	return (
		<div className="flex flex-col items-center">
			<div data-cy='loaf-log' className="flex flex-col items-center">
				<table>
					<thead>
						<tr>
							<th>Loaf</th>
							<th>Hydration Level</th>
							<th>Proving Time</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>White</td>
							<td>70%</td>
							<td>4 Hrs</td>
						</tr>
						<tr>
							<td>Wheat</td>
							<td>73%</td>
							<td>5 Hrs</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}