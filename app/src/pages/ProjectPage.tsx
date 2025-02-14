import { useParams } from 'react-router';
import { useState } from 'react';
import TaskPage from '@/pages/TaskPage';
import ExportPage from '@/pages/ExportPage';

interface Task {
  id: string;
  name: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
}

const dummyTasks: Task[] = [
  { id: '1', name: 'Task 1', description: 'Description 1', status: 'To Do', priority: 'High' },
  {
    id: '2',
    name: 'Task 2',
    description: 'Description 2',
    status: 'In Progress',
    priority: 'Medium',
  },
  { id: '3', name: 'Task 3', description: 'Description 3', status: 'Done', priority: 'Low' },
  { id: '4', name: 'Task 4', description: 'Description 4', status: 'To Do', priority: 'Medium' },
  {
    id: '5',
    name: 'Task 5',
    description: 'Description 5',
    status: 'In Progress',
    priority: 'High',
  },
];

const ProjectPage = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleSaveTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setSelectedTask(null);
  };

  const handleExportTasks = () => {
    console.log('Exporting tasks:', tasks); // Placeholder for actual export logic
    setIsExporting(false);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Project {id}</h1>
        <div className="space-x-2">
          <button className="px-4 py-2 bg-green-500 text-white rounded">Create Task</button>
          <button
            onClick={() => setIsExporting(true)}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Export Tasks
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {['To Do', 'In Progress', 'Done'].map((status) => (
          <div key={status} className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">{status}</h2>
            {tasks.filter((task) => task.status === status).length === 0 ? (
              <p className="text-gray-500">No tasks</p>
            ) : (
              tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 bg-white rounded-lg shadow mb-3 border-l-4 cursor-pointer hover:bg-gray-50 transition ${
                      task.priority === 'High'
                        ? 'border-red-500'
                        : task.priority === 'Medium'
                        ? 'border-yellow-500'
                        : 'border-green-500'
                    }`}
                    onClick={() => setSelectedTask(task)}
                  >
                    <h3 className="font-semibold">{task.name}</h3>
                  </div>
                ))
            )}
          </div>
        ))}
      </div>

      {selectedTask && (
        <TaskPage
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={handleSaveTask}
        />
      )}
      {isExporting && (
        <ExportPage
          taskCount={tasks.length}
          onClose={() => setIsExporting(false)}
          onExport={handleExportTasks}
        />
      )}
    </div>
  );
};

export default ProjectPage;
