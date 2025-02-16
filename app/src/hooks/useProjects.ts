import { useReducer, useEffect } from 'react';

import api from '@/services/api';
import { ProjectForm } from '@/types';
import ProjectReducer from '@/reducers/ProjectReducer';

export const useProjects = () => {
  const [projects, dispatch] = useReducer(ProjectReducer, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        dispatch({ type: 'SET_PROJECTS', payload: data.projects });
      } catch (err) {
        console.error('Fetch projects failed', err);
      }
    };

    fetchProjects();
  }, []);

  const addProject = async (project: ProjectForm) => {
    try {
      const { data } = await api.post('/projects', project);
      dispatch({ type: 'ADD_PROJECT', payload: data.project });
    } catch (err) {
      console.error('Add project failed', err);
    }
  };

  return { projects, addProject };
};
