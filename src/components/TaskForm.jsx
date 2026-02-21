import React from 'react';
import { Plus, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TaskForm({ newTask, setNewTask, addTask, CATEGORIES }) {
    return (
        <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={addTask}
            className="bg-[var(--card-bg)] p-6 sm:p-7 rounded-3xl border border-[var(--border-color)] shadow-sm flex flex-col gap-5 transition-all duration-300 hover:shadow-md"
        >
            <div className="flex items-center gap-2 mb-1">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                    <Plus size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg font-bold text-[var(--text-primary)]">
                    Plan New Task
                </h2>
            </div>

            <div className="space-y-1.5 focus-within:text-blue-500 transition-colors">
                <label className="text-sm font-semibold text-[var(--text-secondary)]">Task Title</label>
                <input
                    type="text"
                    placeholder="e.g. Master React Hooks"
                    value={newTask.title}
                    onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-gray-400 text-[var(--text-primary)] hover:border-gray-300 dark:hover:border-gray-600 shadow-sm"
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 focus-within:text-blue-500 transition-colors">
                    <label className="text-sm font-semibold text-[var(--text-secondary)]">Category</label>
                    <div className="relative">
                        <select
                            value={newTask.category}
                            onChange={e => setNewTask({ ...newTask, category: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all cursor-pointer appearance-none hover:border-gray-300 dark:hover:border-gray-600 shadow-sm text-[var(--text-primary)]"
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-1.5 focus-within:text-blue-500 transition-colors">
                    <label className="text-sm font-semibold text-[var(--text-secondary)]">Deadline</label>
                    <div className="relative">
                        <CalendarDays size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="date"
                            value={newTask.deadline}
                            onChange={e => setNewTask({ ...newTask, deadline: e.target.value })}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50/50 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all date-picker-input cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 shadow-sm text-[var(--text-primary)] min-h-[46px]"
                            required
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={!newTask.title.trim() || !newTask.deadline}
                className="mt-3 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 dark:disabled:from-blue-900/50 dark:disabled:to-indigo-900/50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-2xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] disabled:shadow-none min-h-[50px] flex items-center justify-center"
            >
                <Plus size={20} className="mr-2" />
                Add to Workflow
            </button>
        </motion.form>
    );
}
