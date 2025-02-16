import { useState, useEffect } from 'react';

import { TaskForm } from '@/types';

interface TaskFormDialogProps {
  currentTask: TaskForm | null;
  isOpen: boolean;
  onConfirm: (task: TaskForm) => void;
  onClose: () => void;
}

const TaskFormDialog = ({ currentTask, isOpen, onConfirm, onClose }: TaskFormDialogProps) => {
  const [task, setTask] = useState<TaskForm>({
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Low',
  });

  // this logic works for now but it still flimsy
  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    }
  }, [currentTask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm(task);
    onClose();
    setTask({ title: '', description: '', status: 'To Do', priority: 'Low' });
  };

  const handleCancel = () => {
    onClose();
    setTask({ title: '', description: '', status: 'To Do', priority: 'Low' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Task</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Task Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Task Description"
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={handleCancel} className="px-3 py-1 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormDialog;
