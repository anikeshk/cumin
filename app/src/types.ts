export interface Project {
  id: string;
  name: string;
  description: string;
  todoCount: number;
  inProgressCount: number;
  doneCount: number;
}

export interface ProjectForm {
  name: string;
  description: string;
}

export type ProjectAction =
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'SET_PROJECTS'; payload: Project[] };

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
}

export interface TaskForm {
  id?: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
}

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'DELETE_TASK'; payload: string };

export interface Job {
  id: string;
  projectId: string;
  userId: string;
  status: 'Pending' | 'In Progress' | 'Done' | 'Failed';
  result: string;
}

export interface JobForm {
  projectId: string;
}
