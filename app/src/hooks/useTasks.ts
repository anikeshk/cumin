import { useReducer, useEffect } from 'react';

import api from '@/services/api';
import { TaskForm } from '@/types';
import TaskReducer from '@/reducers/TaskReducer';

export const useTasks = (projectId: string) => {
  const [tasks, dispatch] = useReducer(TaskReducer, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await api.get(`/tasks/project/${projectId}`);
        dispatch({ type: 'SET_TASKS', payload: data.tasks });
      } catch (err) {
        console.error('Fetch tasks failed', err);
      }
    };

    fetchTasks();
  }, [projectId]);

  const addTask = async (task: TaskForm, projectId: string) => {
    try {
      const { data } = await api.post(`/tasks?project_id=${projectId}`, task);
      dispatch({ type: 'ADD_TASK', payload: data.task });
    } catch (err) {
      console.error('Add task failed', err);
    }
  };

  const updateTask = async (task: TaskForm, projectId: string) => {
    try {
      const { data } = await api.put(`/tasks?project_id=${projectId}&task_id=${task.id}`, task);
      dispatch({ type: 'UPDATE_TASK', payload: data.task });
    } catch (err) {
      console.error('Update task failed', err);
    }
  };

  return { tasks, addTask, updateTask };
};
