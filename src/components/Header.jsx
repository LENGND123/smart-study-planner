import React from 'react';
import { BookOpen } from 'lucide-react';

export default function Header() {
    return (
        <header className="pt-10 pb-6 mb-8 px-6 border-b border-[var(--border-color)] bg-[var(--card-bg)]/80 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.02)] sticky top-0 z-20 transition-colors duration-300">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100/80 text-blue-600 rounded-xl dark:bg-blue-900/40 dark:text-blue-400 shadow-inner">
                        <BookOpen size={28} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm tracking-tight">
                        Smart Study Planner
                    </h1>
                </div>
                <div className="text-sm font-medium text-[var(--text-secondary)] hidden sm:block bg-gray-100/50 dark:bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700/50 shadow-sm">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
            </div>
        </header>
    );
}
