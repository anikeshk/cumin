import { useState } from 'react';

import { ProjectForm } from '@/types';

interface ProjectFormDialogProps {
  isOpen: boolean;
  onConfirm: (project: ProjectForm) => void;
  onClose: () => void;
}

const ProjectFormDialog = ({ isOpen, onConfirm, onClose }: ProjectFormDialogProps) => {
  const [project, setProject] = useState<ProjectForm>({
    name: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm(project);
    onClose();
    setProject({ name: '', description: '' });
  };

  const handleCancel = () => {
    onClose();
    setProject({ name: '', description: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Create New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            placeholder="Task Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            value={project.description}
            onChange={handleChange}
            placeholder="Task Description"
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={handleCancel} className="px-3 py-1 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormDialog;
