import { useParams } from 'react-router';
import { useState } from 'react';

import { useTasks } from '@/hooks/useTasks';
import { useJobs } from '@/hooks/useJobs';

import { Task, TaskForm } from '@/types';
import TaskFormDialog from '@/components/TaskFormDialog';
import ExportJobDialog from '@/components/ExportJobDialog';

const ProjectPage = () => {
  const { id } = useParams();
  const { tasks, addTask, updateTask } = useTasks(String(id));
  const { addJob } = useJobs();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleSaveTask = async (updatedTask: TaskForm) => {
    if (updatedTask.id) {
      await updateTask(updatedTask, String(id));
      setSelectedTask(null);
      return;
    } else {
      await addTask(updatedTask, String(id));
    }
    setIsDialogOpen(false);
    setSelectedTask(null);
  };

  const handleExportTasks = async () => {
    await addJob({ projectId: String(id) });
    setIsExporting(false);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Project {id}</h1>
        <div className="space-x-2">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Create Task
          </button>
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
                    onClick={() => {
                      setSelectedTask(task);
                      setIsDialogOpen(true);
                    }}
                  >
                    <h3 className="font-semibold">{task.title}</h3>
                  </div>
                ))
            )}
          </div>
        ))}
      </div>

      <TaskFormDialog
        currentTask={selectedTask}
        isOpen={isDialogOpen}
        onConfirm={handleSaveTask}
        onClose={() => setIsDialogOpen(false)}
      />
      {isExporting && (
        <ExportJobDialog
          taskCount={tasks.length}
          onClose={() => setIsExporting(false)}
          onExport={handleExportTasks}
        />
      )}
    </div>
  );
};

export default ProjectPage;
