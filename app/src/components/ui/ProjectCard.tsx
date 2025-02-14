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
    <Link to={`/project/${id}`} className="block">
      <div className="p-4 bg-white rounded-lg shadow mb-3 border-l-4 border-blue-500 cursor-pointer hover:bg-gray-50 transition w-72">
        {/* Project Name */}
        <p className="text-xl font-semibold text-gray-900">{name}</p>

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
    </Link>
  );
};

export default ProjectCard;
