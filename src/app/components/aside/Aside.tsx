'use client'
import { AsideProps } from "../shared/types";
import { AnimatePresence, motion } from "framer-motion";
import { AsideMenu } from "./AsideMenu";
import { ANIMATION } from "../shared/animations";
import { AsideToDo } from "./AsideToDo";
import { AsideTimer } from "./AsideTimer";
import { useState } from "react";

export const Aside: React.FC<AsideProps> = ({ data,  indexes, handleIndexes, viewAside, handleAside, clearIndexes }) => {


    const animateAside = {
        x: viewAside ? '-200%' : '0%'
    }

    const initialAside = { x: '-200%' }

    const [fullTimer, setFullTimer] = useState<boolean>(false)

    function handleFullTimer(){
        setFullTimer(!fullTimer)
    }

    return (
        <motion.div
            initial={initialAside}
            animate={animateAside}
            transition={{
                duration: 0.5,
                ease: 'easeInOut'
            }}
            className={`absolute left-0 bottom-0 h-full text-[var(--light)] w-full min-w-[300px] z-3  flex gap-3`}
        >
            <AsideMenu data={data} indexes={indexes} handleIndexes={handleIndexes} handleAside={handleAside} />
            <AnimatePresence>
                {indexes.asidemenu === 0 && (
                    <motion.div
                        key="ToDo"
                        {...ANIMATION.slide}
                        className={`absolute w-[80%] sm:w-[15%] h-full left-15 ${indexes.asidemenu === 0? 'z-5': 'z-0'}`}
                    >
                        <AsideToDo data={data} indexes={indexes} handleIndexes={handleIndexes} handleAside={handleAside} clearIndexes={clearIndexes} />
                        
                    </motion.div>
                )}
                    <motion.div
                        key="Timer"
                        initial = {{opacity: 0, width: '300px'}}
                        animate= {{ 
                            opacity: indexes.asidemenu === 1? 1: 0,
                            width: fullTimer? '95%' : '300px',
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`absolute left-[50%] translate-x-[-50%] sm:left-0 sm:translate-0  h-full ${indexes.asidemenu === 1? 'z-5': 'z-0'}`}
                    >
                        <AsideTimer handleAside={handleAside} handleFullTimer={handleFullTimer} fullTimer={fullTimer} />
                    </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};