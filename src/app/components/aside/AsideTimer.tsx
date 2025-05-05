'use client'
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ANIMATION } from "../shared/animations";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AsideWindows } from "../shared/types";
import { VscScreenFull } from "../shared/icons";

export const AsideTimer: React.FC<AsideWindows> = ({ fullTimer, handleFullTimer }) => {
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
            setHistory(prev => [
                { id: Date.now().toString(), time: formatTime(time) },
                ...prev.slice(0, 9)
            ]);
            setIsRunning(false);
            setTime(0);
        }
    };

    return (
        <motion.div className={`whitespace-nowrap  ${!fullTimer&&'sm:border-r sm:border-[var(--color-5)]'} ml-10 sm:ml-20 w-full h-full flex flex-col px-3 pt-2`}>
            <div className="text-[20px] text-[var(--color-8)] flex flex-col gap-3">
                <div className="absolute hidden sm:block z-5 top-4 right-5 md:right-[-70px]"
                    onClick={handleFullTimer}
                >
                    <VscScreenFull />
                </div>
                <span className="relative">Active Task: </span>
                <div className="text-[var(--light)] bg-[var(--color-3)]/20 w-[200px] border border-[var(--light)] flex justify-between items-center px-3 rounded-md">
                    <h3 className="font-[400] text-center">Name Task</h3>
                    <IoIosCloseCircleOutline key={`icon-${Date.now()}`}

                        className="text-[red] cursor-pointer"
                    />
                </div>
            </div>
            <div className={`
                ${!fullTimer ? 'md:text-[55px] text-[55px] sm:py-10': 'md:text-[150px]'} 
                transition-all py-3 duration-300 text-center font-[300]`}>
                {formatTime(time)}
            </div>

            <div className="flex gap-5 justify-center pb-10">
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
            <div className="pt-5 w-full flex flex-col items-center gap-1 text-[17px]">
                <AnimatePresence mode='popLayout'>
                    {history.map((item) => (
                        <motion.div
                            {...ANIMATION.fade}
                            key={item.id}
                            className="text-[var(--dark)] bg-[var(--light)] text-[18px] border-2 border-[var(--color-6)] flex justify-between items-center w-[250px] px-3 rounded-md"
                        >
                            <span className="text-[15px] font-[700]" key={`result-${Date.now()}`}>
                                {history.findIndex(i => i.id === item.id) + 1}.
                            </span>
                            <span key={`name-{item.id}`}>Name task</span>
                            <span className="font-[700]" key={`time-${Date.now()}`}>{item.time}</span>
                            <IoIosCloseCircleOutline key={`icon-${Date.now()}`}
                                onClick={() => {
                                    setHistory(prev => prev.filter(i => i.id !== item.id))
                                }}
                                className="text-[red] cursor-pointer"
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};