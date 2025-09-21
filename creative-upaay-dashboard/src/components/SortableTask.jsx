import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDispatch } from 'react-redux';
import { moveTask } from '../store/taskSlice';

const SortableTask = ({ task }) => {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 hover:shadow-md transition cursor-move group"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 text-sm leading-tight">{task.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor()}`}>
          {task.priority}
        </span>
      </div>
      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>

      {/* Avatars & Interaction Bar */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {['A', 'B', 'C'].map((initial, i) => (
            <div
              key={i}
              className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white"
            >
              {initial}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 text-gray-400 hover:text-blue-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <span className="text-xs text-gray-500">3</span>
          <button className="p-1 text-gray-400 hover:text-green-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <span className="text-xs text-gray-500">2</span>
        </div>
      </div>

      {/* Move Button */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <button
          onClick={handleMove}
          className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition"
        >
          Move to {getNextStatus(task.status).replace('inprogress', 'In Progress')}
        </button>
      </div>
    </div>
  );
};

export default SortableTask;