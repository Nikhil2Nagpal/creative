import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableTask from './SortableTask.jsx';

const TaskColumn = ({ id, title, color, tasks, onAdd }) => {
  return (
    <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 min-w-full md:min-w-80 md:max-w-80 flex-1">
      <div className={`p-4 ${color} text-white rounded-t-lg`}>
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">{title}</h2>
          <span className="bg-white bg-opacity-20 rounded-full px-2 py-1 text-sm font-medium">
            {tasks.length}
          </span>
        </div>
      </div>
      <div className="p-4">
        <button
          onClick={onAdd}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-700 transition mb-4 flex items-center justify-center gap-1"
        >
          <span>+</span>
          <span>Add Task</span>
        </button>
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
            <SortableTask key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default TaskColumn;