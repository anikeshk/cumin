import { useState } from 'react';

interface Task {
  id: string;
  name: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
}

interface TaskPageProps {
  task: Task | null;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

const TaskPage = ({ task, onClose, onSave }: TaskPageProps) => {
  const [editedTask, setEditedTask] = useState<Task>(task!);

  if (!task) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Task Name"
          />
          <input
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Description"
          />
          <select
            name="status"
            value={editedTask.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={() => onSave(editedTask)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
