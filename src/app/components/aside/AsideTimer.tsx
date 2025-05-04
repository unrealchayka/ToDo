'use client'
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ANIMATION } from "../shared/animations";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AsideWindows } from "../shared/types";

export const AsideTimer: React.FC<AsideWindows> = ()=> {
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
        <motion.div className="whitespace-nowrap absolute w-full h-full flex flex-col pt-[10%] rounded-xl rounded-l-[0]">
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
                            key={item.id}
                            className="bg-[var(--color-5)] flex justify-between items-center text-[var(--color-2)] w-[90%] px-4 py-1 rounded-3xl"
                        >
                            <span key={`result-${Date.now()}`} className="text-[12px]">
                                {history.findIndex(i => i.id === item.id) + 1}.
                            </span>
                            <span key={`time-${Date.now()}`}>{item.time}</span>
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