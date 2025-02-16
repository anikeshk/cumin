import api from '@/services/api';
import { JobForm } from '@/types';

export const useJobs = () => {
  const fetchJobs = async () => {
    try {
      const { data } = await api.get('/jobs');
      return data.jobs;
    } catch (err) {
      console.error('Fetch jobs failed', err);
      return [];
    }
  };

  const addJob = async (job: JobForm) => {
    try {
      const { data } = await api.post('/jobs', job);
      return data.job;
    } catch (err) {
      console.error('Add job failed', err);
      return null;
    }
  };

  return { fetchJobs, addJob };
};
