import React from 'react';
import { useDispatch } from 'react-redux';
import { moveTask, deleteTask } from '../store/taskSlice';

const TaskCard = ({ task, listeners }) => {
  const dispatch = useDispatch();

  const getStatusColor = () => {
    switch (task.status) {
      case 'todo': return 'bg-purple-100 text-purple-800';
      case 'inprogress': return 'bg-orange-100 text-orange-800';
      case 'done': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextStatus = (current) => {
    if (current === 'todo') return 'inprogress';
    if (current === 'inprogress') return 'done';
    return 'todo';
  };

  const handleMove = () => {
    dispatch(moveTask({ id: task.id, newStatus: getNextStatus(task.status) }));
  };

  const handleDelete = () => {
    if (window.confirm('Delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };

  return (
    <div
      {...listeners}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 hover:shadow-md transition-all duration-200 cursor-move"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900 line-clamp-1">{task.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor()}`}>
          {task.priority}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      <div className="flex justify-between items-center">
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>
          {task.status.replace('inprogress', 'In Progress')}
        </span>
        <div className="flex gap-1">
          <button
            onClick={handleMove}
            className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100 transition"
          >
            Move
          </button>
          <button
            onClick={handleDelete}
            className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded hover:bg-red-100 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;