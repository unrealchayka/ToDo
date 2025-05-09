'use client'
import { AnimatePresence, motion } from "framer-motion";
import { AsideMenu } from "./AsideMenu";
import { ANIMATION } from "../shared/animations";
import { AsideToDo } from "./AsideToDo";
import { AppContext } from "../provider/AppProvider";
import { useContext } from "react";

export const Aside = () => {
    const { indexes } = useContext(AppContext)

    return (
        <motion.div
            className={`left-0 relative bottom-0 h-full text-[var(--light)] w-[25%] min-w-[350px] flex gap-3`}
        >
            <AsideMenu/>
            <AnimatePresence>
                {indexes.asidemenu === 0 && (
                    <motion.div
                        key="ToDo"
                        {...ANIMATION.slide}
                        className={`absolute overflow-hidden  w-full sm:w-full bg-[var(--color-1)] pl-15 h-full ${indexes.asidemenu === 0? 'z-7': 'z-0'}`}
                    >
                        <AsideToDo/>
                        
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};