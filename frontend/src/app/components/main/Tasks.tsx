'use client'
import React, { Dispatch, SetStateAction } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ANIMATION } from '../shared/animations'
import { Task } from '../shared/types'


export const Tasks = (
    {tasks, setTask}: 
    {
        tasks: Task[] | undefined; 
        setTask: Dispatch<SetStateAction<Task[] | undefined>>
    }) => {
    return (
        <motion.div
            className='flex flex-col text-[12px] sm:text-[16px] md:text-[20px] z-3 h-full overflow-y-auto w-full text-[var(--light)]'>
            <motion.div className='overflow-y-scroll overflow-x-hidden task-scroll-bar py-10 w-full flex flex-col gap-10'>
                <h1 className='text-[50px] font-[700]'>Tasks Lists</h1>
                <AnimatePresence mode='wait'>
                    {tasks?.map((item) => {
                        return (
                            <motion.div
                                layoutId={item.title}
                                {...ANIMATION.slide}
                                className='flex flex-col gap-2 border-b-5 w-full pr-5'
                                key={`${item.id}-${item.title}`}
                            >
                                <motion.h1
                                    key={`h1-${item.id}`}
                                    className='text-[16px] sm:text-[22px] bg-white/5 md:text-[30px] font-[] sm:font-[900] px-5 py-2'>{item.title}</motion.h1>
                                <motion.div
                                    key={`item-${item.id}`}
                                    className='py-10'>
                                    {/* {item.tasks.map((task) => {
                                        return (
                                            <motion.div
                                                className={`${task.finished&& 'opacity-45'} px-5 ml-10 border-b flex justify-between items-center mb-3`}
                                                key={task.id}>
                                                <motion.div className='flex flex-col gap-1 w-[50%]'>
                                                    <span className='text-[var(--blue)]'>{task.title}</span>
                                                    <p className='text-[var(--color-3)] text-[15px]'>Date Created: {task.dateTimeCreated}</p> 
                                                    <p className='text-[var(--color-3)] text-[15px]'>Execution Day{task.executionDay}</p>
                                                </motion.div>
                                                <p className='w-[30%]'><span className='text-[var(--color-8)]'>{task.timeToComplete} </span> to complete the task</p>
                                                <motion.div className='flex flex-col items-end gap-1 w-[20%]'>
                                                    {task.finished ? <CgCheckO className='text-[var(--green)]' /> : <FaExclamationTriangle className='text-[red]/40' />}
                                                    <p>{task.priority}</p>
                                                </motion.div>
                                            </motion.div>
                                        )
                                    })} */}
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}