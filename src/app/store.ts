import { create } from 'zustand';

interface Type {
  rootEmployee: CEO; // the root employee will be the CEO and we will use that to design the hierarchy
  setRootEmployee: (newValue: CEO) => void;
  positions: string[];
}

export const useStore = create<Type>((set) => ({
  rootEmployee: JSON.parse(localStorage.getItem('rootEmployee') as string) || {},
  setRootEmployee: (newValue: CEO) => set({rootEmployee: newValue}),
  positions: ['CEO', 'Head of Design', 'Head of Staff', 'Head of Engineering', 'Team Leader', 'Team Member'],
}))
