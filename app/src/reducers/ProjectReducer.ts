import { Project, ProjectAction } from '@/types';

const ProjectReducer = (state: Project[], action: ProjectAction): Project[] => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return action.payload;
    case 'ADD_PROJECT':
      return [...state, action.payload];
    case 'UPDATE_PROJECT':
      return state.map((project) => (project.id === action.payload.id ? action.payload : project));
    default:
      return state;
  }
};

export default ProjectReducer;
