'use client'
import { AnimatePresence, motion } from "framer-motion";
import { AsideMenu } from "./AsideMenu";
import { ANIMATION } from "../shared/animations";
import { AsideToDo } from "./AsideToDo";
import { AsideTimer } from "./AsideTimer";
import { useState } from "react";
import { AppContext } from "../provider/AppProvider";
import { useContext } from "react";

export const Aside = () => {
    const { viewAside, indexes } = useContext(AppContext)

    const animateAside = {
        x: viewAside ? '-110%' : '0%'
    }

    const initialAside = { x: '-110%' }

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
            className={`absolute left-0 bottom-0 h-full text-[var(--light)] w-full min-w-[350px] flex gap-3`}
        >
            <AsideMenu/>
            <AnimatePresence>
                {indexes.asidemenu === 0 && (
                    <motion.div
                        key="ToDo"
                        {...ANIMATION.slide}
                        className={`absolute  w-full sm:w-[25%] bg-[var(--color-1)] pl-15 h-full ${indexes.asidemenu === 0? 'z-7': 'z-0'}`}
                    >
                        <AsideToDo/>
                        
                    </motion.div>
                )}
                    <motion.div
                        key="Timer"
                        initial = {{opacity: 0, width: '20%'}}
                        animate= {{ 
                            opacity: indexes.asidemenu === 1? 1: 0,
                            width: fullTimer? '100%' : '25%',
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`absolute left-[50%] translate-x-[-50%] bg-[var(--color-1)] sm:w-[25%] pl-15 sm:left-0 sm:translate-0  h-full z-6`}
                    >
                        <AsideTimer handleFullTimer={handleFullTimer} fullTimer={fullTimer} />
                    </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};