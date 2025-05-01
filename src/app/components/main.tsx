'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, number } from 'framer-motion';
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
import { IoIosCloseCircleOutline } from "react-icons/io";

interface Props {
    className?: string
}
interface Indexes {
    orangeIndex: number;
    blueIndex: number;
    greenIndex: number;
    purpleIndex: number;
}
interface AsideProps {
    indexes: Indexes;
    handleIndexes: (
        nameIndex: keyof Indexes,
        value: number
    ) => void;
    sizeWindowBool?: boolean
}

const AsideMenu: React.FC<AsideProps> = ({ indexes, handleIndexes, sizeWindowBool }) => {
    const firstIconList = [
        <FaNoteSticky />,
        <RxLapTimer />,
        <HiMiniCube />,
        <IoCalendar />,
        <IoSearch />
    ]

    const secondIconList = [
        <TfiReload />,
        <IoNotifications />,
        <IoInformationCircleOutline />
    ]
    return (
        <div className={`border-hover ${sizeWindowBool && 'rounded-r-[0]'} flex flex-col justify-between items-center text-[25px] text-[var(--color-5)] rounded-xl `}>
            <div>
                <motion.ul
                    layout
                    className='h-full inline-flex flex-col gap-3 p-5'>
                    {firstIconList.map((icon, index) => {
                        const indexBool = index == indexes.blueIndex
                        return (
                            <motion.li
                                key={index}
                                className={`
                                            relative cursor-pointer
                                            ${!indexBool && 'hover:text-[#56cfe1]'}`}

                                onClick={() => { handleIndexes('blueIndex', index) }}
                            >
                                <motion.span className={`relative z-1 transition-colors duration-700 ${indexBool && 'text-[var(--color-9)]'}`}>{icon}</motion.span>
                                {indexBool && <motion.div
                                    layoutId='blueActivIndex'
                                    key='blueActivIndex'
                                    layout
                                    className='bg-[#56cfe1] z-0 w-10 h-10 top-[50%] left-[50%] translate-[-50%] rounded-full absolute'
                                ></motion.div>}
                            </motion.li>
                        )
                    })}
                </motion.ul>
            </div>

            <div>
                <ul className='h-full text-[18px] inline-flex flex-col gap-3 p-5'>

                    <motion.ul
                        layout
                        className='h-full inline-flex flex-col gap-3'>
                        {secondIconList.map((icon, index) => {
                            return (
                                <motion.li
                                    key={index}
                                    className={`
                                            relative cursor-pointer
                                            transition-all
                                            hover:scale-125
                                            ${index == 0 && 'hover:-rotate-360 duration-1000'}
                                        `}
                                >
                                    {icon}
                                </motion.li>
                            )
                        })}
                    </motion.ul>
                </ul>
            </div>
        </div>
    )
}

const AsideToDo: React.FC<AsideProps> = ({ indexes, handleIndexes }) => {
    const orangeActive = 'text-[#fca311]'
    const greenActive = 'text-[#70e000]'
    const purpleActive = 'text-[#7b2cbf]'

    const dedlineList = [
        {
            title: 'Day',
            icon: BsCalendarDay,
            count: '11'
        },
        {
            title: 'Week',
            icon: BsCalendarWeek,
            count: '24'
        },
        {
            title: 'Month',
            icon: IoCalendarNumberOutline,
            count: '41'
        },
        {
            title: 'Letter',
            icon: FaBoxArchive,
            count: '11'
        },
    ]

    const lists = [
        {
            title: '🖥️ Work Tasks',
            count: '35'
        },
        {
            title: '📖 Study Goals',
            count: '50'
        },
        {
            title: '🛫 Travel Plans',
            count: '14'
        },
        {
            title: '🎯 Daily To-Dos',
            count: '25'
        },
        {
            title: '🍀 Life Errands',
            count: '7'
        },
    ]

    const filtersList = [
        {
            title: 'This Week',
            icon: BsCalendarWeek,
            count: '44'
        },
        {
            title: 'Unfinished',
            icon: FaExclamationTriangle,
            count: '6'
        },
        {
            title: 'Completed',
            icon: CgCheckO,
            count: '60'
        }
    ]
    return (
        <motion.div
            className='border-hover text-[13px] sm:text-[16px] 3xl:text-[20px] whitespace-nowrap absolute flex flex-col gap-2 3xl:gap-8 w-full h-full rounded-xl rounded-l-[0]'>
            <div className='px-5 pt-2'>
                <p className={`mb-1 flex gap-2 items-center ${orangeActive}`}>Dedlines <RiTimerFlashLine /></p>
                <motion.ul
                    layout
                    className='w-full inline-flex flex-col gap-3'>
                    {dedlineList.map((obj, index) => {
                        const indexBool = index == indexes.orangeIndex
                        return (
                            <motion.li
                                key={index}
                                onClick={() => { handleIndexes('orangeIndex', indexBool ? -1 : index) }}
                                className={`
                                            text-[var(--color-4)]
                                            relative cursor-pointer
                                            flex justify-between
                                            w-full transition-all
                                            ${indexBool && 'text-[var(--color-9)] font-[900]'}
                                            
                                        `}>
                                <span className={`flex gap-2 relative z-1 items-center transition-colors duration-600 ${indexBool && 'text-[var(--colo-9)]'}`}><obj.icon /> {obj.title}</span>
                                <span className='relative z-1'>{obj.count}</span>
                                {indexBool && <motion.div
                                    layoutId='orangeActivIndex'
                                    key='blueActivIndex'
                                    layout
                                    className='bg-[#fca311] z-0 absolute w-[110%] h-5 sm:h-7 3xl:h-10 top-[50%] left-[50%] translate-[-50%] rounded-full'
                                ></motion.div>}
                            </motion.li>
                        )
                    })}
                </motion.ul>
            </div>

            <div>
                <div className='px-5'>
                    <p className={`mb-1 flex gap-2 items-center ${greenActive}`}>Lists <VscListSelection /></p>
                    <motion.ul
                        layout
                        className='w-full inline-flex flex-col gap-3'>
                        {lists.map((obj, index) => {
                            const indexBool = index == indexes.greenIndex
                            return (
                                <motion.li
                                    key={index}
                                    onClick={() => { handleIndexes('greenIndex', indexBool ? -1 : index) }}
                                    className={`
                                            text-[var(--color-4)]
                                            relative cursor-pointer
                                            flex justify-between
                                            w-full transition-all
                                            ${indexBool && 'text-[var(--color-9)] font-[900]'}
                                            
                                        `}>
                                    <span className={`flex gap-2 relative z-1 items-center transition-colors duration-600 ${indexBool && 'text-[var(--colo-9)]'}`}>{obj.title}</span>
                                    <span className='relative z-1'>{obj.count}</span>
                                    {indexBool && <motion.div
                                        layoutId='greenActivIndex'
                                        key='blueActivIndex'
                                        layout
                                        className='bg-[#70e000] z-0 w-[110%] h-5 sm:h-7 3xl:h-10 top-[50%] left-[50%] translate-[-50%] rounded-full absolute'
                                    ></motion.div>}
                                </motion.li>
                            )
                        })}
                    </motion.ul>
                </div>
            </div>

            <div>
                <div className='px-5'>
                    <p className={`mb-1  flex gap-2 items-center ${purpleActive}`}>Filters <TbFilters /></p>
                    <motion.ul
                        layout
                        className='w-full inline-flex flex-col gap-3'>
                        {filtersList.map((obj, index) => {
                            const indexBool = index == indexes.purpleIndex
                            return (
                                <motion.li
                                    key={index}
                                    onClick={() => { handleIndexes('purpleIndex', indexBool ? -1 : index) }}
                                    className={`
                                            text-[var(--color-4)]
                                            relative cursor-pointer
                                            flex justify-between
                                            w-full transition-all
                                            ${indexBool && 'text-[var(--color-9)] font-[900]'}
                                            
                                        `}>
                                    <span className={`flex gap-2 relative z-1 items-center transition-colors duration-600 ${indexBool && 'text-[var(--colo-9)]'}`}><obj.icon /> {obj.title}</span>
                                    <span className='relative z-1'>{obj.count}</span>
                                    {indexBool && <motion.div
                                        layoutId='purpleActivIndex'
                                        key='blueActivIndex'
                                        layout
                                        className='bg-[#7b2cbf] z-0 w-[110%] h-5 sm:h-7 3xl:h-10 top-[50%] left-[50%] translate-[-50%] rounded-full absolute'
                                    ></motion.div>}
                                </motion.li>
                            )
                        })}
                    </motion.ul>
                </div>
            </div>
        </motion.div>
    )
}
const AsideTimer = () => {
    const his: never[] = [];
    const [history, setHistory] = useState<string[]>([])
    const COLORS = {
        primary: '#3b82f6',    // синий
        secondary: '#ef4444',  // красный
        background: '#f3f4f6', // серый фон
        text: '#111827'        // темно-серый текст
    };
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Форматирование времени в MM:SS
    const formatTime = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const toggleTimer = () => setIsRunning(prev => !prev);
    const resetTimer = (timeValue: string) => {
        console.log(history)
        setHistory([...history, timeValue])
        setIsRunning(false);
        setTime(0);
    };


    return (
        <motion.div
            className='border-hover whitespace-nowrap text-[var(--color-1)] absolute w-full h-full flex flex-col rounded-xl rounded-l-[0]'>
            <div className='text-[40px] text-center font-[900] py-10'>
                {formatTime(time)}
            </div>
            <div className='flex gap-5 justify-center border-hover-bottom pb-10 '>
                <motion.button
                    style={{
                        padding: '10px 24px',
                        backgroundColor: isRunning ? COLORS.secondary : COLORS.primary,
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTimer}
                >
                    {isRunning ? 'Стоп' : 'Старт'}
                </motion.button>

                <motion.button
                    style={{
                        padding: '10px 24px',
                        backgroundColor: '#6b7280',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={()=>{isRunning && resetTimer(formatTime(time))}}
                >
                    Сброс
                </motion.button>
            </div>
            <div className='pt-5 w-full flex flex-col items-center gap-2 text-[20px]'>
                <AnimatePresence>
                    {history.map((value, index)=>{
                        return(
                            <motion.div
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            className='bg-[var(--color-9)] flex justify-between items-center text-[var(--color-2)] w-[90%] px-4 py-1 rounded-3xl'
                            key={index}
                            >
                                <span className='text-[12px]'>{index+1}.</span>
                                <span>{value}</span>
                                <IoIosCloseCircleOutline 
                                onClick={()=>{
                                    setHistory(prevItems => prevItems.filter((_, delIndex) => delIndex !== index))
                                }}
                                className='text-[red] cursor-pointer' />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>

        </motion.div>
    )
}

const Aside: React.FC<AsideProps> = ({ indexes, handleIndexes }) => {
    const sizeWindowBool =
        indexes.blueIndex === 0 ||
        indexes.blueIndex === 1 ||
        indexes.blueIndex === 2

    const ToDoBoolIndex = indexes.blueIndex === 0
    const TimerBoolIndex = indexes.blueIndex === 1

    return (
        <motion.div
            initial={{ width: 110 }}
            animate={{ width: sizeWindowBool ? 500 : 110 }}
            className='box-3d-shadow h-full bg-[#111] flex gap-3 rounded-3xl p-4'
        >
            <AsideMenu indexes={indexes} handleIndexes={handleIndexes} sizeWindowBool={sizeWindowBool} />
            <AnimatePresence mode='wait'>

                {ToDoBoolIndex && (
                    <motion.div
                        key='ToDo'
                        layout
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        exit={{ width: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut"
                        }}
                        className="overflow-hidden relative w-full"
                    >
                        <AsideToDo indexes={indexes} handleIndexes={handleIndexes} />
                    </motion.div>
                )}
                {TimerBoolIndex && (
                    <motion.div
                        key='Timer'
                        layout
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        exit={{ width: 0 }}
                        transition={{
                            duration: 0.4,
                            ease: "easeInOut"
                        }}
                        className="overflow-hidden relative w-full"
                    >
                        <AsideTimer />
                    </motion.div>
                )}
            </AnimatePresence>


        </motion.div>

    )
}

function MainWIndow() {
    return (
        <div className='box-3d-shadow bg-[#111] w-full h-full p-4 rounded-3xl'
        >
            <div className='border-hover w-full h-full rounded-xl'></div>
        </div>
    )
}

export const Main: React.FC<Props> = ({ className }) => {
    const blueIndex = 0
    const orangeIndex = 0
    const greenIndex = 3
    const purpleIndex = 2

    function handleIndexes(nameIndex: keyof Indexes, value: number) {
        setIndexes({
            ...indexes,
            [nameIndex]: value
        }
        )
    }

    const [indexes, setIndexes] = useState({
        orangeIndex,
        blueIndex,
        greenIndex,
        purpleIndex
    })

    return (
        <div className='flex gap-4 3xl:gap-10 h-full container m-auto'>
            <Aside indexes={indexes} handleIndexes={handleIndexes} />
            <MainWIndow />
        </div>
    )
}