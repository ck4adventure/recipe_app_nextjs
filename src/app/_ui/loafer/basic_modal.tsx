interface ModalProps {
	isOpen: boolean;
	onSaveClose: () => void;
	onClose: () => void;
	children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onSaveClose, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 ">
			<div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
			<div className="flex flex-col justify-between bg-white p-4 rounded shadow-lg z-10 min-h-[200px] min-w-[400px]">
				{children}
				<div className='flex justify-between items-center'>
					<button onClick={onClose}>Discard</button>
					<button onClick={onSaveClose} className="">Save and Close</button>
				</div>
			</div>
		</div>
	);
};