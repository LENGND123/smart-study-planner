import React, { memo } from 'react';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { CheckCircle2, Circle, Trash2, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskCard = memo(({ task, toggleTask, deleteTask }) => {
    const getPriorityInfo = (deadline) => {
        const days = differenceInCalendarDays(parseISO(deadline), new Date());
        if (days < 0) return {
            label: 'High',
            color: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
            daysText: 'Overdue',
            isOverdue: true
        };
        if (days === 0) return {
            label: 'High',
            color: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
            daysText: 'Today',
            isOverdue: false
        };
        if (days === 1) return {
            label: 'Medium',
            color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
            daysText: '1 day left',
            isOverdue: false
        };
        if (days === 2) return {
            label: 'Medium',
            color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
            daysText: '2 days left',
            isOverdue: false
        };
        return {
            label: 'Low',
            color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
            daysText: `${days} days left`,
            isOverdue: false
        };
    };

    const priority = getPriorityInfo(task.deadline);
    const isOverdue = !task.completed && priority.isOverdue;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`group flex items-center gap-4 p-5 bg-[var(--card-bg)] border rounded-3xl transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 ${task.completed
                    ? 'opacity-60 xl:opacity-50 saturate-[0.7] border-[var(--border-color)] bg-gray-50/50 dark:bg-gray-800/10 shadow-none'
                    : isOverdue
                        ? 'border-red-300 dark:border-red-500/50 shadow-[0_8px_30px_rgb(239,68,68,0.1)] z-10 relative bg-red-50/30 dark:bg-red-900/10 hover:shadow-[0_12px_40px_rgb(239,68,68,0.15)]'
                        : 'border-[var(--border-color)] shadow-sm hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]'
                }`}
        >
            <button
                onClick={() => toggleTask(task.id)}
                className="shrink-0 transition-transform active:scale-75 focus:outline-none focus-visible:ring-2 ring-blue-500 rounded-full"
            >
                {task.completed ? (
                    <CheckCircle2 size={28} strokeWidth={2.5} className="text-emerald-500 transition-colors drop-shadow-sm" />
                ) : (
                    <Circle size={28} strokeWidth={2} className={`transition-colors duration-300 ${isOverdue ? 'text-red-300 hover:text-red-500 dark:text-red-400/50 dark:hover:text-red-400'
                            : 'text-gray-300 dark:text-gray-600 hover:text-blue-500 dark:hover:text-blue-400'
                        }`} />
                )}
            </button>

            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h3 className={`text-[1.05rem] font-semibold truncate transition-all duration-300 ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-[var(--text-primary)]'
                    }`}>
                    {task.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-[var(--text-secondary)]">
                    <span className="font-medium px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-none text-[11px] tracking-wide uppercase">
                        {task.category}
                    </span>
                    <span className={`flex items-center gap-1.5 font-medium px-2 py-1 rounded-md ${isOverdue ? 'text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-900/20'
                            : task.completed ? 'opacity-70' : ''
                        }`}>
                        <CalendarDays size={14} className={isOverdue ? "animate-pulse" : ""} />
                        {new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        {!task.completed && (
                            <span className={`ml-1 font-bold ${isOverdue ? 'text-red-600 dark:text-red-400' : 'opacity-80'}`}>
                                ({priority.daysText})
                            </span>
                        )}
                    </span>
                </div>
            </div>

            <div className="shrink-0 flex items-center justify-end gap-3 min-w-[100px]">
                {!task.completed && (
                    <span className={`px-3 py-1.5 text-xs font-bold tracking-wide rounded-xl border shadow-sm ${priority.color}`}>
                        {priority.label}
                    </span>
                )}

                <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none outline-none focus-visible:ring-2 ring-red-500 scale-95 group-hover:scale-100 active:scale-90"
                    aria-label="Delete task"
                >
                    <Trash2 size={20} strokeWidth={2.5} />
                </button>
            </div>
        </motion.div>
    );
});

export default TaskCard;
