interface PopupProps {
  message: string;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const Popup: React.FC<PopupProps> = ({
  message,
  onClose,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-xl mb-4">Notice</h2>
        <p>{message}</p>
        <div className="mt-4 flex justify-center">
          {onConfirm && onCancel ? (
            <>
              <button
                onClick={onConfirm}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Yes
              </button>
              <button
                onClick={onCancel}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                No
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="bg-[#D8968F] text-white px-4 py-2 rounded"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
