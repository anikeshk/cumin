import React from 'react';
import { Link } from 'react-router';

import { Project } from '@/types';

const ProjectCard: React.FC<Project> = ({ id, name, todoCount, inProgressCount, doneCount }) => {
  return (
    <Link to={`/project/${id}`} className="block">
      <div className="p-4 bg-white rounded-lg shadow mb-3 border-l-4 border-blue-500 cursor-pointer hover:bg-gray-50 transition w-72">
        <p className="text-xl font-semibold text-gray-900">{name}</p>
        <div className="flex justify-between mt-3">
          {[
            { label: 'To Do', value: todoCount, color: 'text-blue-500' },
            { label: 'In Progress', value: inProgressCount, color: 'text-yellow-500' },
            { label: 'Completed', value: doneCount, color: 'text-green-500' },
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
