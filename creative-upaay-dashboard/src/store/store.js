import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

// Load initial state from localStorage
const preloadedState = {
  tasks: loadFromLocalStorage('tasks') || undefined
};

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState,
});

// Save state to localStorage on every update
store.subscribe(() => {
  const state = store.getState();
  saveToLocalStorage('tasks', state.tasks);
});

export default store;