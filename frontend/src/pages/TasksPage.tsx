import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TaskItem } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { DataTable, Column } from '../components/common/DataTable';
import { CheckSquare, LayoutGrid, List, Plus, Tag, Clock, ArrowRightLeft } from 'lucide-react';

export const TasksPage: React.FC = () => {
  const { tasks, updateTaskColumn, addTask, currentUser } = useApp();
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask({
      title: newTaskTitle,
      assignee: currentUser.name,
      dueDate: '2026-09-30',
      priority: 'High',
      boardColumn: 'todo',
      tags: ['Operational', 'Task'],
      department: currentUser.department,
    });
    setNewTaskTitle('');
  };

  const columnsList: { id: TaskItem['boardColumn']; label: string; color: string }[] = [
    { id: 'todo', label: 'To Do', color: 'border-slate-300 bg-slate-50' },
    { id: 'in_progress', label: 'In Progress', color: 'border-amber-300 bg-amber-50/30' },
    { id: 'blocked', label: 'Blocked', color: 'border-rose-300 bg-rose-50/30' },
    { id: 'completed', label: 'Completed', color: 'border-emerald-300 bg-emerald-50/30' },
  ];

  const taskTableColumns: Column<TaskItem>[] = [
    { header: 'Task ID', accessorKey: 'code', sortable: true, cell: (t) => <span className="font-mono font-bold text-slate-900">{t.code}</span> },
    { header: 'Task Title', accessorKey: 'title', sortable: true, cell: (t) => <span className="font-semibold text-slate-900">{t.title}</span> },
    { header: 'Assignee', accessorKey: 'assignee', sortable: true },
    { header: 'Priority', accessorKey: 'priority', cell: (t) => <StatusBadge status={t.priority} variant="priority" /> },
    { header: 'Due Date', accessorKey: 'dueDate', cell: (t) => <span className="font-mono text-slate-600">{t.dueDate}</span> },
    {
      header: 'Board Stage',
      accessorKey: 'boardColumn',
      cell: (t) => (
        <select
          value={t.boardColumn}
          onChange={(e) => updateTaskColumn(t.id, e.target.value as any)}
          className="px-2 py-1 rounded border border-slate-200 text-xs font-mono bg-white text-slate-800"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="blocked">Blocked</option>
          <option value="completed">Completed</option>
        </select>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Title + Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 mb-1">
            <CheckSquare className="w-4 h-4" />
            <span>OPERATIONAL TASK BOARD</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Kanban Task Execution & Sprint Board
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational workflow stage tracking across To Do, In Progress, Blocked & Completed.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Kanban View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              List View
            </button>
          </div>
        </div>
      </div>

      {/* Inline Quick Add Task */}
      <form onSubmit={handleCreateTask} className="bg-white p-4 rounded-xl border border-slate-200 flex gap-2">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add quick task (e.g. Schedule ISO 27001 evidence upload)..."
          className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </form>

      {/* KANBAN BOARD */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columnsList.map((col) => {
            const colTasks = tasks.filter((t) => t.boardColumn === col.id);

            return (
              <div
                key={col.id}
                className={`rounded-2xl border ${col.color} p-4 flex flex-col space-y-3 min-h-[500px]`}
              >
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                    {col.label}
                  </h3>
                  <span className="font-mono text-xs font-bold bg-white text-slate-800 px-2 py-0.5 rounded-full border border-slate-200">
                    {colTasks.length}
                  </span>
                </div>

                <div className="flex-1 space-y-3">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-2 hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono font-bold text-slate-900">{task.code}</span>
                        <StatusBadge status={task.priority} variant="priority" />
                      </div>

                      <h4 className="font-semibold text-xs text-slate-900 leading-snug">
                        {task.title}
                      </h4>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-100">
                        <span>{task.assignee}</span>
                        <span>{task.dueDate}</span>
                      </div>

                      {/* Move Column Dropdown */}
                      <div className="pt-2">
                        <select
                          value={task.boardColumn}
                          onChange={(e) => updateTaskColumn(task.id, e.target.value as any)}
                          className="w-full text-[10px] p-1 border border-slate-200 rounded font-mono bg-slate-50 text-slate-700"
                        >
                          <option value="todo">Move → To Do</option>
                          <option value="in_progress">Move → In Progress</option>
                          <option value="blocked">Move → Blocked</option>
                          <option value="completed">Move → Completed</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <DataTable
          title="Operational Task Register"
          subtitle="Task assignments and completion status"
          data={tasks}
          columns={taskTableColumns}
        />
      )}
    </div>
  );
};
