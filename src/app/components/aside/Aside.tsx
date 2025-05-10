'use client'
import { AnimatePresence, motion } from "framer-motion";
import { AsideToDo } from "./AsideToDo";
import { AppContext } from "../provider/AppProvider";
import { useContext } from "react";

export const Aside = () => {
    const { indexes } = useContext(AppContext)

    return (
        <motion.div
            className={`left-0 relative bottom-0 h-full text-[var(--light)] w-full min-w-[350px] flex gap-3`}
        >
            <AnimatePresence>
                    <motion.div
                        key="ToDo"
                        className={`overflow-hidden  w-full bg-[var(--color-1)] md:pl-15 h-full ${indexes.asidemenu === 0? 'z-7': 'z-0'}`}
                    >
                        <AsideToDo/>
                        
                    </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};