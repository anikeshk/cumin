interface ExportPageProps {
  taskCount: number;
  onClose: () => void;
  onExport: () => void;
}

const ExportPage = ({ taskCount, onClose, onExport }: ExportPageProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Export Tasks</h2>
        <p className="text-gray-700">
          Export will export <strong>{taskCount}</strong> tasks. Do you want to continue?
        </p>
        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={onExport} className="px-4 py-2 bg-blue-500 text-white rounded">
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportPage;
