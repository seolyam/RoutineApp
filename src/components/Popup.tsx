interface PopupProps {
  message: string;
  onClose: () => void;
}

function Popup({ message, onClose }: PopupProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-xl mb-4">Notice</h2>
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-[#D8968F] text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Popup;
