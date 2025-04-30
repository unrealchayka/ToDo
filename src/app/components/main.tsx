import React from 'react';
import { IoCalendar } from "react-icons/io5";
import { BsCalendarDay, BsCalendarWeek } from "react-icons/bs";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FaBoxArchive } from "react-icons/fa6";
import { VscListSelection } from "react-icons/vsc";
import { RiTimerFlashLine } from "react-icons/ri";
import { TbFilters } from "react-icons/tb";
import { FaExclamationTriangle } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { CgCheckO } from "react-icons/cg";
import { FaNoteSticky } from "react-icons/fa6";
import { RxLapTimer } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { HiMiniCube } from "react-icons/hi2";

interface Props {
    className?: string
}


function Aside(){
    const iconClasses = 'hover:text-[var(--color-9)] transition'
    const orangeActive = 'text-[#fca311]'
    const blueActive = 'text-[#56cfe1]'
    const greenActive = 'text-[#70e000]'
    const purpleActive = 'text-[#7b2cbf]'

    return(
        <div
        className='box-3d-shadow w-[500px] bg-[#111] h-full flex gap-3 rounded-3xl p-4'
        >
                <div className='border-hover flex flex-col justify-between items-center text-[25px] text-[var(--color-5)] rounded-xl rounded-r-[0]'>
                    <div>
                        <ul className='h-full inline-flex flex-col gap-3 p-5'>
                            <li className={`${iconClasses} ${blueActive}`}><FaNoteSticky /></li>
                            <li className={`${iconClasses}`}><IoCalendar /></li>
                            <li className={`${iconClasses}`}><RxLapTimer /></li>
                            <li className={`${iconClasses}`}><IoSearch /></li>
                            <li className={`${iconClasses}`}><HiMiniCube /></li>
                        </ul>
                    </div>

                    <div>
                        <ul className='h-full text-[18px] inline-flex flex-col gap-3 p-5'>
                            <li className={iconClasses}><TfiReload /></li>
                            <li className={iconClasses}><IoNotifications /></li>
                            <li className={iconClasses}><IoInformationCircleOutline /></li>
                        </ul>
                    </div>
                </div>

                <div className='border-hover w-full flex flex-col rounded-xl rounded-l-[0]'>
                <div className='px-5 py-4'>
                    <p className={`text-[20px] mb-[10px] flex gap-2 items-center ${orangeActive}`}>Dedlines <RiTimerFlashLine /></p>
                    <ul className='text-[var(--color-5)] w-full inline-flex flex-col gap-3 rounded-xl rounded-r-[0]'>
                        <li className='flex justify-between'><span className={`flex gap-2 items-center ${orangeActive}`}><BsCalendarDay /> Day</span><span>11</span></li>
                        <li className='flex justify-between'><span className={`flex gap-2 items-center`}><BsCalendarWeek /> Week</span><span>24</span></li>
                        <li className='flex justify-between'><span className={`flex gap-2 items-center`}><IoCalendarNumberOutline /> Month</span><span>41</span></li>
                        <li className='flex justify-between'><span className={`flex gap-2 items-center`}><FaBoxArchive />Letter</span><span>11</span></li>
                    </ul>
                </div>

                <div>
                    <div className='px-5 py-4'>
                        <p className={`text-[20px] mb-[10px] flex gap-2 items-center ${greenActive}`}>Lists <VscListSelection /></p>
                        <ul className='text-[var(--color-5)] w-full inline-flex flex-col gap-3 rounded-xl rounded-r-[0]'>
                            <li className='flex justify-between'><span className={`flex gap-2 items-center ${greenActive}`}>🖥️ Work Tasks</span><span>35</span></li>
                            <li className='flex justify-between'><span className={`flex gap-2 items-center`}>📖 Study Goals</span><span>50</span></li>
                            <li className='flex justify-between'><span className={`flex gap-2 items-center`}>🛫 Travel Plans</span><span>14</span></li>
                            <li className='flex justify-between'><span className={`flex gap-2 items-center`}>🎯 Daily To-Dos</span><span>25</span></li>
                            <li className='flex justify-between'><span className={`flex gap-2 items-center`}>🍀 Life Errands</span><span>7</span></li>
                        </ul>
                    </div>
                </div>

                <div>
                    <div className='px-5 py-4'>
                        <p className={`text-[20px] mb-[10px] flex gap-2 items-center ${purpleActive}`}>Filters <TbFilters /></p>
                        <ul className='text-[var(--color-5)] w-full inline-flex flex-col gap-3 rounded-xl rounded-r-[0]'>
                            <li className='flex justify-between'><span className={`flex gap-2 items-center`}><BsCalendarWeek /> This Week</span><span>44</span></li>
                            <li className='flex justify-between'><span className={`flex gap-2 items-center`}><FaExclamationTriangle /> Unfinished</span><span>6</span></li>
                            <li className='flex justify-between'><span className={`flex gap-2 items-center ${purpleActive}`}><CgCheckO /> Completed</span><span>50</span></li>
                        </ul>
                    </div>
                </div>
                </div>
        </div>
    )
}

function MainWIndow(){
    return(
        <div className='box-3d-shadow bg-[#111] w-full h-full p-4 rounded-3xl'
        >
            <div className='border-hover w-full h-full rounded-xl'></div>
        </div>
    )
}

export const Main: React.FC<Props> = ({ className }) => {
  return (
    <div className='flex gap-10 h-full container m-auto'>
        <Aside/>
        <MainWIndow/>
    </div>
)}