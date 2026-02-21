import React from 'react';
import { Filter, CheckCheck } from 'lucide-react';

export default function FilterBar({ filterCategory, setFilterCategory, CATEGORIES, completedTasks, clearCompleted }) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--card-bg)]/80 backdrop-blur-md p-4 rounded-3xl border border-[var(--border-color)] shadow-sm sticky top-[104px] z-10 transition-colors duration-300">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-hide mask-edges">
                <Filter size={18} className="text-[var(--text-secondary)] ml-1 mr-2 shrink-0 hidden sm:block" />
                {['All', ...CATEGORIES].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`shrink-0 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 ${filterCategory === cat
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-[1.02]'
                                : 'text-[var(--text-secondary)] bg-gray-50/50 dark:bg-gray-800/40 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[var(--text-primary)] border border-transparent'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {completedTasks > 0 ? (
                <button
                    onClick={clearCompleted}
                    className="shrink-0 flex items-center justify-center w-full sm:w-auto gap-2 text-sm font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/20 dark:text-red-400 px-5 py-2.5 rounded-2xl border border-red-100 dark:border-red-900/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                >
                    <CheckCheck size={16} strokeWidth={2.5} />
                    Clear Completed
                </button>
            ) : null}
        </div>
    );
}
