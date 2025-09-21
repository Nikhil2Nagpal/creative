import { createSlice } from '@reduxjs/toolkit';
import { loadFromLocalStorage } from '../utils/localStorage';

// Load initial tasks from localStorage or use default
const savedTasks = loadFromLocalStorage('tasks');
const initialTasks = savedTasks && savedTasks.tasks && savedTasks.tasks.length > 0 
  ? savedTasks.tasks 
  : [
    {
      id: 1,
      title: "Brainstorming",
      description: "Brainstorming brings team members' diverse experience into play.",
      status: "todo",
      priority: "high",
      category: "work",
    },
    {
      id: 2,
      title: "Research",
      description: "Start research to plan and create an optimal product for users.",
      status: "todo",
      priority: "medium",
      category: "work",
    },
    {
      id: 3,
      title: "Wireframes",
      description: "User flows and wireframes include the most basic content and visuals.",
      status: "inprogress",
      priority: "low",
      category: "design",
    },
    {
      id: 4,
      title: "Design System",
      description: "It just needs to adapt the UI from what you did before.",
      status: "inprogress",
      priority: "high",
      category: "design",
    },
    {
      id: 5,
      title: "Mobile App",
      description: "Develop mobile app with latest tech stack.",
      status: "done",
      priority: "high",
      category: "work",
    },
  ];

const initialState = {
  tasks: initialTasks,
  filter: {
    priority: "all",
    category: "all",
  },
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        ...action.payload,
        id: Date.now(),
      };
      state.tasks.push(newTask);
    },
    moveTask: (state, action) => {
      const { id, newStatus } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) task.status = newStatus;
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTask, moveTask, setFilter, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;