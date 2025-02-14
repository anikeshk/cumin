import ProjectCard from '@/components/ui/ProjectCard';

const HomePage = () => {
  const projects = [
    { id: '1', name: 'Project Alpha', todoCount: 5, inProgressCount: 2, completedCount: 10 },
    { id: '2', name: 'Project Beta', todoCount: 3, inProgressCount: 4, completedCount: 7 },
  ];

  return (
    <div className="container mx-auto">
      {/* Header Section */}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Projects</h1>
        <div className="space-x-2">
          <button className="px-4 py-2 bg-green-500 text-white rounded">Create Task</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Create Project
          </button>
        </div>
      </div>

      {/* Project Grid */}
      <div className="mt-6 grid grid-cols-4 gap-6 bg-gray-100 p-4 rounded-lg shadow">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
