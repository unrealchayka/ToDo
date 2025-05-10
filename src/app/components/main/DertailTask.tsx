'use client'
import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../provider/AppProvider'
import { motion } from 'framer-motion'


export const DertailTask = () => {
    const context = useContext(AppContext)
    const {data} = context
  return (
    <motion.div 
        className='flex flex-col text-[12px] sm:text-[16px] md:text-[20px] z-3 h-full overflow-y-auto w-full text-[var(--light)]'>
        <div className='overflow-y-scroll overflow-x-hidden task-scroll-bar py-10 w-full flex flex-col gap-10'>
            <h1 className='text-[50px] font-[700]'>Tasks Lists</h1>
            {data.map((item)=>{
                return(
                <div 
                className='flex flex-col gap-2 border-b-5 w-full pr-5'
                key={item.id}>
                    <h1 className='text-[16px] sm:text-[22px] md:text-[30px] font-[600] sm:font-[900] bg-[var(--color-1)] px-5 py-2 rounded-md border'>{item.title}</h1>
                    <div className='py-10'>
                        {item.tasks.map((task)=>{
                            return(
                                <div 
                                    className='ml-10 border-b'
                                    key={task.id}>
                                    <h2>{task.title}</h2>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
            })}
        </div>
    </motion.div>
)}