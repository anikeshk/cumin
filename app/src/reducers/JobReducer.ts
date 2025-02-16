import { Job, JobAction } from '@/types';

const JobReducer = (state: Job[], action: JobAction): Job[] => {
  switch (action.type) {
    case 'SET_JOBS':
      return action.payload;
    case 'ADD_JOB':
      return [...state, action.payload];
    case 'UPDATE_JOB':
      return state.map((job) => (job.id === action.payload.id ? action.payload : job));
    default:
      return state;
  }
};

export default JobReducer;
