import React from 'react';
import { Link } from 'react-router';

interface ProjectCardProps {
  id: string;
  name: string;
  todoCount: number;
  inProgressCount: number;
  completedCount: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  todoCount,
  inProgressCount,
  completedCount,
}) => {
  return (
    <div className="p-4 bg-white border border-black rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 w-72">
      {/* Project Name with proper underline fix */}
      <Link to={`/project/${id}`} className="text-lg font-semibold text-gray-800">
        <span className="hover:underline">{name}</span>
      </Link>

      {/* Task Counts */}
      <div className="flex justify-between mt-3">
        {[
          { label: 'To Do', value: todoCount, color: 'text-blue-500' },
          { label: 'In Progress', value: inProgressCount, color: 'text-yellow-500' },
          { label: 'Completed', value: completedCount, color: 'text-green-500' },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-sm text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
