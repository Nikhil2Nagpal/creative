import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, moveTask } from '../store/taskSlice';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableTask from './SortableTask';
import AddTaskModal from './AddTaskModal';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector(state => state.tasks);
  const [activeId, setActiveId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('todo');

  const filteredTasks = tasks.filter(task => {
    const matchPriority = filter.priority === 'all' || task.priority === filter.priority;
    const matchCategory = filter.category === 'all' || task.category === filter.category;
    return matchPriority && matchCategory;
  });

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    setActiveId(null);

    const activeTask = tasks.find(t => t.id === parseInt(active.id));
    const overStatus = over.id;

    if (activeTask && activeTask.status !== overStatus) {
      dispatch(moveTask({ id: activeTask.id, newStatus: overStatus }));
    }
  };

  const openModal = (status) => {
    setSelectedStatus(status);
    setIsModalOpen(true);
  };

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-blue-500', count: filteredTasks.filter(t => t.status === 'todo').length },
    { id: 'inprogress', title: 'In Progress', color: 'bg-yellow-500', count: filteredTasks.filter(t => t.status === 'inprogress').length },
    { id: 'done', title: 'Done', color: 'bg-green-500', count: filteredTasks.filter(t => t.status === 'done').length },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Project Dashboard</h1>
        <p className="text-gray-600 mt-1">Organize, prioritize, and complete your tasks</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 p-5 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Priority</label>
          <select
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filter.priority}
            onChange={(e) => dispatch(setFilter({ priority: e.target.value }))}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
          <select
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filter.category}
            onChange={(e) => dispatch(setFilter({ category: e.target.value }))}
          >
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="design">Design</option>
            <option value="personal">Personal</option>
          </select>
        </div>
      </div>

      {/* Task Columns */}
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-6">
          {columns.map(column => (
            <div key={column.id} className="flex-shrink-0 w-80">
              <div className={`${column.color} text-white p-4 rounded-t-xl flex justify-between items-center`}>
                <h2 className="font-semibold">{column.title}</h2>
                <span className="bg-white bg-opacity-20 rounded-full px-2.5 py-1 text-sm">{column.count}</span>
              </div>
              <div className="bg-white min-h-96 p-4 rounded-b-xl shadow-sm border border-gray-200">
                <button
                  onClick={() => openModal(column.id)}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-700 transition text-sm font-medium mb-4"
                >
                  ➕ Add Task
                </button>
                <SortableContext items={filteredTasks.filter(t => t.status === column.id).map(t => t.id)} strategy={verticalListSortingStrategy}>
                  {filteredTasks
                    .filter(t => t.status === column.id)
                    .map(task => (
                      <SortableTask key={task.id} task={task} />
                    ))}
                </SortableContext>
              </div>
            </div>
          ))}
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="bg-white border-2 border-dashed rounded-xl p-4 shadow-xl w-80 mx-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="font-medium text-gray-700">Moving task...</span>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        status={selectedStatus}
      />
    </div>
  );
};

export default Dashboard;