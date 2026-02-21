import React from 'react';
import { Target, ListTodo, TrendingUp } from 'lucide-react';

export default function DashboardStats({ totalTasks, pendingTasks, progressPercent }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--card-bg)] p-4 rounded-3xl border border-[var(--border-color)] shadow-sm flex flex-col justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                <div className="flex items-center gap-2 mb-2 text-[var(--text-secondary)]">
                    <div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <ListTodo size={16} className="text-gray-600 dark:text-gray-400" />
                    </div>
                    <span className="text-sm font-medium">Total Tasks</span>
                </div>
                <span className="text-3xl font-bold ml-1">{totalTasks}</span>
            </div>

            <div className="bg-[var(--card-bg)] p-4 rounded-3xl border border-[var(--border-color)] shadow-sm flex flex-col justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                <div className="flex items-center gap-2 mb-2 text-[var(--text-secondary)]">
                    <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                        <Target size={16} className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="text-sm font-medium">Pending</span>
                </div>
                <span className="text-3xl font-bold ml-1">{pendingTasks}</span>
            </div>

            <div className="col-span-2 bg-[var(--card-bg)] p-6 rounded-3xl border border-[var(--border-color)] shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md">
                <div className="flex items-center justify-between mb-4 text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                            <TrendingUp size={16} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-sm font-semibold">Completion Progress</span>
                    </div>
                    <span className="text-sm font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-2.5 py-0.5 rounded-full">
                        {progressPercent}%
                    </span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner flex items-center p-0.5">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 transition-all duration-1000 ease-out rounded-full bg-[length:200%_auto] animate-gradient"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
