import { useState } from 'react';

import { useProjects } from '@/hooks/useProjects';

import { ProjectForm } from '@/types';
import ProjectCard from '@/components/ProjectCard';
import ProjectFormDialog from '@/components/ProjectFormDialog';

const HomePage = () => {
  const { projects, addProject } = useProjects();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddTask = async (project: ProjectForm) => {
    await addProject(project);
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Projects</h1>
        <div className="space-x-2">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Project
          </button>
          <ProjectFormDialog
            isOpen={isDialogOpen}
            onConfirm={handleAddTask}
            onClose={() => setIsDialogOpen(false)}
          />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-6 bg-gray-100 p-4 rounded-lg shadow">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
