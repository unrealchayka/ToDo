'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isMobile } from 'react-device-detect';

import {
    IoCalendar, IoCalendarNumberOutline, IoSearch, IoNotifications,
    IoInformationCircleOutline
} from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsCalendarDay, BsCalendarWeek } from "react-icons/bs";
import { FaBoxArchive, FaNoteSticky } from "react-icons/fa6";
import { FaExclamationTriangle } from "react-icons/fa";
import { VscListSelection } from "react-icons/vsc";
import { RiTimerFlashLine } from "react-icons/ri";
import { TbFilters } from "react-icons/tb";
import { TfiReload } from "react-icons/tfi";
import { CgCheckO } from "react-icons/cg";
import { RxLapTimer } from "react-icons/rx";
import { HiMiniCube } from "react-icons/hi2";
import { FaHamburger } from "react-icons/fa";


// Типы
interface Props {
    className?: string;
}

interface Indexes {
    orangeIndex: number;
    blueIndex: number;
    greenIndex: number;
    purpleIndex: number;
}

interface AsideProps {
    indexes: Indexes;
    handleIndexes: (nameIndex: keyof Indexes, value: number) => void;
    sizeWindowBool?: boolean;
    viewAside?: boolean;
    handleAside?: () => void;
}

interface MainWindowProps {
    handleAside?: () => void;
    viewAside: boolean;
    sizeWindowBool?: boolean;
}

// Константы
const ACTIVE_COLORS = {
    orange: '#fca311',
    green: '#70e000',
    purple: '#7b2cbf',
    blue: '#56cfe1'
};

const ANIMATION = {
    slide: {
        initial: { height: 0 },
        animate: { height: "100%" },
        exit: { width: 0 },
        transition: { duration: 0.3, ease: "easeInOut" }
    },
    fade: {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 }
    }
};

// Компонент иконки с анимацией
const IconItem: React.FC<{
    icon: React.ReactNode;
    active: boolean;
    onClick: () => void;
    color: string;
}> = ({ icon, active, onClick }) => (
    <motion.li
        className={`relative cursor-pointer ${!active && 'hover:text-[#56cfe1]'}`}
        onClick={onClick}
    >
        <motion.span className={`relative z-10 transition-colors duration-700 ${active && 'text-[var(--color-9)]'}`}>
            {icon}
        </motion.span>
        {active && (
            <motion.div
                layoutId="activeIndicator"
                className={`bg-[#56cfe1] z-0 w-10 h-10 top-[50%] left-[50%] translate-[-50%] rounded-full absolute`}
            />
        )}
    </motion.li>
);

// Основные компоненты
const AsideMenu: React.FC<AsideProps> = ({ indexes, handleIndexes, sizeWindowBool, handleAside }) => {
    const firstIconList = [
        { id: 'note', icon: <FaNoteSticky /> },
        { id: 'timer', icon: <RxLapTimer /> },
        { id: 'cube', icon: <HiMiniCube /> },
        { id: 'calendar', icon: <IoCalendar /> },
        { id: 'search', icon: <IoSearch /> }
    ];

    const secondIconList = [
        { id: 'reload', icon: <TfiReload /> },
        { id: 'notifications', icon: <IoNotifications /> },
        { id: 'info', icon: <IoInformationCircleOutline /> }
    ];

    return (
        <div className={`border-hover ${sizeWindowBool ? 'rounded-r-[0]' : ''} flex flex-col justify-between items-center text-[25px] text-[var(--color-5)] rounded-xl`}>
            <div>
                <motion.ul layout className="h-full justify-center items-center inline-flex flex-col gap-3 p-5">
                    {firstIconList.map((icon, index) => (
                        <IconItem
                            key={icon.id}
                            icon={icon.icon}
                            active={index === indexes.blueIndex}
                            onClick={() => handleIndexes('blueIndex', index)}
                            color={ACTIVE_COLORS.blue}
                        />
                    ))}
                </motion.ul>
            </div>

            <div>
                <motion.ul layout className="h-full text-[18px] inline-flex flex-col gap-3 p-5">
                    {secondIconList.map((icon, index) => (
                        <motion.li
                            key={icon.id}
                            className="relative cursor-pointer transition-all hover:scale-125"
                            whileHover={index === 0 ? { rotate: 360 } : {}}
                            transition={{ duration: index === 0 ? 1 : 0.3 }}
                        >
                            {icon.icon}
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </div>
    );
};

const AsideToDo: React.FC<AsideProps> = ({ indexes, handleIndexes }) => {
    const dataSections = [
        {
            title: 'Dedlines',
            icon: <RiTimerFlashLine />,
            color: ACTIVE_COLORS.orange,
            items: [
                { title: 'Day', icon: <BsCalendarDay />, count: '11' },
                { title: 'Week', icon: <BsCalendarWeek />, count: '24' },
                { title: 'Month', icon: <IoCalendarNumberOutline />, count: '41' },
                { title: 'Letter', icon: <FaBoxArchive />, count: '11' }
            ],
            indexKey: 'orangeIndex'
        },
        {
            title: 'Lists',
            icon: <VscListSelection />,
            color: ACTIVE_COLORS.green,
            items: [
                { title: '🖥️ Work Tasks', icon: '', count: '35' },
                { title: '📖 Study Goals', icon: '', count: '50' },
                { title: '🛫 Travel Plans', icon: '', count: '14' },
                { title: '🎯 Daily To-Dos', icon: '', count: '25' },
                { title: '🍀 Life Errands', icon: '', count: '7' }
            ],
            indexKey: 'greenIndex'
        },
        {
            title: 'Filters',
            icon: <TbFilters />,
            color: ACTIVE_COLORS.purple,
            items: [
                { title: 'This Week', icon: <BsCalendarWeek />, count: '44' },
                { title: 'Unfinished', icon: <FaExclamationTriangle />, count: '6' },
                { title: 'Completed', icon: <CgCheckO />, count: '60' }
            ],
            indexKey: 'purpleIndex'
        }
    ];

    return (
        <motion.div className="border-hover text-[13px] sm:text-[16px] 3xl:text-[20px] whitespace-nowrap absolute flex flex-col gap-2 3xl:gap-8 w-full h-full rounded-xl rounded-l-[0]">
            {dataSections.map((section) => (
                <div key={section.title} className="px-5 pt-2">
                    <p className="mb-1 flex gap-2 items-center" style={{ color: section.color }}>
                        {section.title} {section.icon}
                    </p>
                    <motion.ul layout className="w-full inline-flex flex-col gap-3">
                        {section.items.map((item, index) => {
                            const isActive = index === indexes[section.indexKey as keyof Indexes];
                            return (
                                <motion.li
                                    key={`${section.title}-${index}`}
                                    onClick={() => handleIndexes(section.indexKey as keyof Indexes, isActive ? -1 : index)}
                                    className="text-[var(--color-4)] relative cursor-pointer flex justify-between w-full transition-all"
                                >
                                    <span className={`flex gap-2 relative z-10 items-center transition-colors duration-600 ${isActive ? 'text-[var(--color-9)] font-[900]' : ''}`}>
                                        {item.icon && item.icon} {item.title}
                                    </span>
                                    <span className="relative z-10">{item.count}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId={`${section.indexKey}Indicator`}
                                            className="absolute z-0 w-[110%] h-5 sm:h-7 3xl:h-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                                            style={{ backgroundColor: section.color }}
                                        />
                                    )}
                                </motion.li>
                            );
                        })}
                    </motion.ul>
                </div>
            ))}
        </motion.div>
    );
};

const AsideTimer = () => {
    const [history, setHistory] = useState<{ id: string; time: string }[]>([]);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const formatTime = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => setTime(prev => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const toggleTimer = () => setIsRunning(prev => !prev);
    const resetTimer = () => {
        if (isRunning) {
            setHistory(prev => [...prev, { id: Date.now().toString(), time: formatTime(time) }]);
            setIsRunning(false);
            setTime(0);
        }
    };

    return (
        <motion.div className="border-hover whitespace-nowrap text-[var(--color-1)] absolute w-full h-full flex flex-col rounded-xl rounded-l-[0]">
            <div className="text-[40px] text-center font-[900] py-10">
                {formatTime(time)}
            </div>
            <div className="flex gap-5 justify-center border-hover-bottom pb-10">
                <motion.button
                    className={`px-6 py-2 text-white border-none rounded-lg cursor-pointer text-base ${isRunning ? 'bg-[#ef4444]' : 'bg-[#3b82f6]'
                        }`}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTimer}
                >
                    {isRunning ? 'Стоп' : 'Старт'}
                </motion.button>
                <motion.button
                    className="px-6 py-2 bg-[#6b7280] text-white border-none rounded-lg cursor-pointer text-base"
                    whileTap={{ scale: 0.95 }}
                    onClick={resetTimer}
                >
                    Сброс
                </motion.button>
            </div>
            <div className="pt-5 w-full flex flex-col items-center gap-2 text-[20px]">
                <AnimatePresence>
                    {history.map((item) => (
                        <motion.div
                            {...ANIMATION.fade}
                            key={item.id} // Теперь используем уникальный id
                            className="bg-[var(--color-9)] flex justify-between items-center text-[var(--color-2)] w-[90%] px-4 py-1 rounded-3xl"
                        >
                            <span key={`result-${Date.now()}`} className="text-[12px]">
                                {history.findIndex(i => i.id === item.id) + 1}.
                            </span>
                            <span key={`time-${Date.now()}`}>{item.time}</span>
                            <IoIosCloseCircleOutline key={`icon-${Date.now()}`}
                                onClick={() => setHistory(prev => prev.filter(i => i.id !== item.id))}
                                className="text-[red] cursor-pointer"
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const Aside: React.FC<AsideProps> = ({ indexes, handleIndexes, viewAside, sizeWindowBool, handleAside }) => {
    const mobileClasses = 'm-auto left-[50%] translate-x-[-50%] w-[90vw] h-screen'

    const [isReady, setIsReady] = useState(false);

    const animateAside = {
        width: sizeWindowBool ? '23%' : '110px',
        left: viewAside ? '-26%' : '0%'
    }

    const mobileAnimateAside = {
        width: sizeWindowBool ? '90%' : '110px',
        left: viewAside ? '50%' : '-100%'
    }


    const initialAside = { width: '23%', left: '-26%' }

    const mobileInitialAside = { left: '-26%', top: '50px' }

    useEffect(() => {
        setIsReady(true);
    }, []);
    return (
        <motion.div
            initial={isReady && (!isMobile ? initialAside: mobileInitialAside)}
            animate={isReady && (!isMobile ? animateAside: mobileAnimateAside)}
            transition={{
                duration: 0.5,
                ease: 'easeInOut'
            }}
            className={`absolute overflow-hidden ${isReady && (isMobile && mobileClasses)} min-w-[110px] z-3 left-0 box-3d-shadow h-full bg-[#111] flex gap-3 rounded-3xl p-4`}
        >
            <AsideMenu indexes={indexes} handleIndexes={handleIndexes} handleAside={handleAside} sizeWindowBool={sizeWindowBool} />
            <AnimatePresence mode="wait">
                {indexes.blueIndex === 0 && (
                    <motion.div
                        key="ToDo"
                        {...ANIMATION.slide}
                        className="overflow-hidden relative w-full"
                    >
                        <AsideToDo indexes={indexes} handleIndexes={handleIndexes} />
                    </motion.div>
                )}
                {indexes.blueIndex === 1 && (
                    <motion.div
                        key="Timer"
                        {...ANIMATION.slide}
                        className="overflow-hidden relative w-full"
                    >
                        <AsideTimer />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export const Main: React.FC<Props> = ({ className }) => {

    const [viewAside, setViewAside] = useState<boolean>(true);
    function handleAside() {
        setViewAside(!viewAside);
        console.log(viewAside)
    };
    const [indexes, setIndexes] = useState({
        orangeIndex: 0,
        blueIndex: 0,
        greenIndex: 3,
        purpleIndex: 2
    });

    const sizeWindowBool = [0, 1, 2].includes(indexes.blueIndex);

    const handleIndexes = (nameIndex: keyof Indexes, value: number) => {
        setIndexes(prev => ({ ...prev, [nameIndex]: value }));
    };

    return (
        <div className={`flex relative gap-4 3xl:gap-10 h-full container m-auto ${className}`}>
            <div
                        className='absolute z-5 text-[25px] text-[white] transition-all duration-500 hover:text-[var(--blue)] cursor-pointer'
                        onClick={handleAside}
                        >
                        <FaHamburger />
                    </div>
            <Aside indexes={indexes} handleIndexes={handleIndexes} viewAside={viewAside} sizeWindowBool={sizeWindowBool} handleAside={handleAside} />
            <MainWindow handleAside={handleAside} viewAside={viewAside} sizeWindowBool={sizeWindowBool} />
        </div>
    );
};

const MainWindow: React.FC<MainWindowProps> = ({ handleAside, viewAside, sizeWindowBool }) => {
    // Для SSR: начальное состояние должно совпадать на сервере и клиенте
    const [isReady, setIsReady] = useState(false);
  
    useEffect(() => {
      setIsReady(true); // Устанавливаем флаг, что компонент смонтирован на клиенте
    }, []);
  
    if (!isReady) {
      // Возвращаем пустой div во время SSR и начальной гидратации
      return <div className="hidden" />;
    }
  
    // Не рендерим на мобильных устройствах
    if (isMobile) {
      return null;
    }
  
    return (
      <motion.div
        initial={{ width: '100%' }}
        animate={{
          width: !sizeWindowBool
            ? '92%'
            : viewAside
              ? '100%'
              : '75%'
        }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut'
        }}
        className={`absolute right-0 top-0 box-3d-shadow bg-[#111] h-full p-4 rounded-3xl`}
      >
        <div
          className='absolute top-7 left-7 text-[25px] text-[white] transition-all duration-500 hover:text-[var(--blue)] cursor-pointer'
          onClick={handleAside}
        >
          <FaHamburger />
        </div>
        <div className="border-hover w-full h-full rounded-xl"></div>
      </motion.div>
    );
  };