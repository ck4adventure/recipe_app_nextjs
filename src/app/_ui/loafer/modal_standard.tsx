'use client'
interface StandardModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export const StandardModal: React.FC<StandardModalProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 ">
			<div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
			<div className="flex flex-col justify-between bg-white p-4 rounded shadow-lg z-10 min-h-[200px] min-w-[400px]">
				{children}
				<div className='flex justify-between items-center'>
					<button onClick={onClose}>Close</button>
				</div>
			</div>
		</div>
	);
};