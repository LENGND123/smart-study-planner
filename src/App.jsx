import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';

// Components
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskCard from './components/TaskCard';

const CATEGORIES = ['DSA', 'AI/ML', 'React', 'College', 'Other'];

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('study-planner-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState({ title: '', category: 'DSA', deadline: '' });
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    localStorage.setItem('study-planner-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.deadline) return;

    const task = {
      id: crypto.randomUUID(),
      ...newTask,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks(prev => [task, ...prev]);
    setNewTask({ title: '', category: 'DSA', deadline: '' });
    toast.success('Task added successfully!', {
      style: {
        borderRadius: '12px',
        background: 'var(--card-bg)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-color)'
      },
    });
  };

  const toggleTask = useCallback((id) => {
    let justCompleted = false;

    setTasks(prev => {
      const updated = prev.map(t => {
        if (t.id === id) {
          if (!t.completed) justCompleted = true;
          return { ...t, completed: !t.completed };
        }
        return t;
      });
      return updated;
    });

    // We check if it was just marked as completed, then fire the toast
    // using setTimeout to ensure it happens after render cycle starts
    setTimeout(() => {
      if (justCompleted) {
        toast('Task completed! Great job! 🎉', {
          icon: '👏',
          style: {
            borderRadius: '12px',
            background: 'var(--card-bg)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)'
          },
        });
      }
    }, 0);
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    toast.success('Task deleted!', {
      icon: '🗑️',
      style: {
        borderRadius: '12px',
        background: 'var(--card-bg)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-color)'
      }
    });
  }, []);

  const clearCompleted = useCallback(() => {
    if (window.confirm("Are you sure you want to clear all completed tasks?")) {
      setTasks(prev => prev.filter(t => !t.completed));
      toast.success('Completed tasks cleared', {
        style: {
          borderRadius: '12px',
          background: 'var(--card-bg)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)'
        }
      });
    }
  }, []);

  // Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Filter & Sort tasks smartly: Active Overdue -> Active Priority -> Completed
  const filteredTasks = useMemo(() => {
    let result = filterCategory === 'All'
      ? tasks
      : tasks.filter(t => t.category === filterCategory);

    return result.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });
  }, [tasks, filterCategory]);

  return (
    <div className="min-h-screen pb-12 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#0f172a] dark:to-[#070b14] text-[var(--text-primary)] transition-colors duration-300 antialiased selection:bg-blue-200 selection:text-blue-900 flex flex-col font-sans">
      <Toaster position="bottom-right" />

      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 z-0">

        {/* Left Column */}
        <div className="lg:col-span-4 space-y-6">
          <DashboardStats
            totalTasks={totalTasks}
            pendingTasks={pendingTasks}
            progressPercent={progressPercent}
          />

          <TaskForm
            newTask={newTask}
            setNewTask={setNewTask}
            addTask={addTask}
            CATEGORIES={CATEGORIES}
          />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 flex flex-col h-full space-y-5">
          <FilterBar
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            CATEGORIES={CATEGORIES}
            completedTasks={completedTasks}
            clearCompleted={clearCompleted}
          />

          <div className="flex-1 space-y-3.5 pb-20">
            {filteredTasks.length === 0 ? (
              <div className="h-[300px] flex flex-col items-center justify-center text-[var(--text-secondary)] bg-[var(--card-bg)] border border-[var(--border-color)] border-dashed rounded-3xl p-8 text-center animate-in fade-in zoom-in duration-500 shadow-sm">
                <div className="w-20 h-20 mb-5 rounded-3xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 rotate-3 transition-transform hover:rotate-6">
                  <BookOpen size={36} strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 tracking-tight">Focus Achieved</h3>
                <p className="max-w-xs text-sm opacity-80 leading-relaxed text-gray-400">
                  {filterCategory === 'All'
                    ? "No tasks yet. Add your first study goal 🚀"
                    : `No active tasks found in the ${filterCategory} category.`}
                </p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    toggleTask={toggleTask}
                    deleteTask={deleteTask}
                  />
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center text-sm text-[var(--text-secondary)] border-t border-[var(--border-color)] bg-[var(--card-bg)]/50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center justify-center gap-2">
          <p className="font-medium tracking-wide">
            Built with <span className="text-blue-500 font-bold">React</span> & <span className="text-sky-500 font-bold">Tailwind</span>
          </p>
          <p className="opacity-70 text-xs">A premium productivity experience</p>
        </div>
      </footer>
    </div>
  );
}
