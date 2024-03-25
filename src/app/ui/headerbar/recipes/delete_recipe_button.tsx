// deleteRecipeButton should invoke the deleteRecipe action creator when clicked
'use client'
import React from "react";
import Modal from 'react-modal';
import { deleteRecipeByIdAndRedirect } from "@/app/lib/actions";

Modal.setAppElement('#corner_root');

export const DeleteRecipeButton = ({ id }: { id: number }) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const handleDeleteClick = () => {
		setIsOpen(true);
	}

	const handleDeleteRecipe = async () => {
		setIsOpen(false);
		await deleteRecipeByIdAndRedirect(id);
	}

	return (
		<div>
			<button
				data-cy='recipe-detail-delete-button'
				onClick={handleDeleteClick}>
				Delete Recipe
			</button>
			<Modal
				isOpen={isOpen}
				onRequestClose={setIsOpen.bind(null, false)}
				contentLabel="Confirm Delete Recipe Modal"
				style={{
					overlay: {
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(255, 255, 255, 0.50)'
					},
					content: {
						position: 'absolute',
						width: '200x',
						height: '200px',
						top: '50%',
						left: '50%',
						right: 'auto',
						bottom: 'auto',
						transform: 'translate(-50%, -50%)',
						border: '2px solid #ccc',
						background: '#fff',
						overflow: 'auto',
						WebkitOverflowScrolling: 'touch',
						borderRadius: '8px',
						outline: 'none',
						padding: '20px'
					}
				}}
			>
				<div 				data-cy='delete-recipe-modal'>
				<div className="flex justify-end" >
					<button onClick={setIsOpen.bind(null, false)}>X</button>
				</div>

				<div className="m-2 flex justify-center">
					<h2>Confirm Delete Recipe</h2>
				</div>
				<div className="flex justify-center" ><span className="text-6xl">!</span></div>
				<div className="flex justify-center">
					<div className="m-2">
						<button onClick={setIsOpen.bind(null, false)}>Close</button>
					</div>
					<div className="m-2 bottom-3">
						<button data-cy="delete-recipe-button"  onClick={handleDeleteRecipe}>Delete</button>
					</div>
				</div>
				</div>
			</Modal>
		</div>
	);
}