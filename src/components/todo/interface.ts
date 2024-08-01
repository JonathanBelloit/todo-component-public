export interface Todo {
  id?: string;
  title: string;
  description?: string;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
  project?: string;
  urgency: string;
}

export interface Project {
  id?: string;
  title: string;
}