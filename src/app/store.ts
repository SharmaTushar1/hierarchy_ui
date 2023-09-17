import { create } from 'zustand';

interface Type {
  rootEmployee: CEO; // the root employee will be the CEO and we will use that to design the hierarchy
  setRootEmployee: (newValue: CEO) => void;
  positions: {[key: number]: string};
}

export const useStore = create<Type>((set) => ({
  rootEmployee: JSON.parse(localStorage.getItem('rootEmployee') as string) || {},
  setRootEmployee: (newValue: CEO) => set({rootEmployee: newValue}),
  positions: {0:'CEO', 1:'Head of Design', 2:'Head of Staff', 3:'Head of Engineering', 4:'Team Leader', 5:'Team Member'}
}))
