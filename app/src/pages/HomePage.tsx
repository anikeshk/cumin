import ProjectCard from '@/components/ui/ProjectCard';

const HomePage = () => {
  const projects = [
    { id: '1', name: 'Project Alpha', todoCount: 5, inProgressCount: 2, completedCount: 10 },
    { id: '2', name: 'Project Beta', todoCount: 3, inProgressCount: 4, completedCount: 7 },
  ];

  return (
    <div className="container mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b pb-3 mt-4">
        <h2 className="text-xl font-semibold">Your Projects</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Create Project
        </button>
      </div>

      {/* Project Grid */}
      <div className="mt-6 grid grid-cols-5 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
