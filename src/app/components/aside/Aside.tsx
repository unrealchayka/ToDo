'use client'
import { AsideProps } from "../shared/types";
import { AnimatePresence, motion } from "framer-motion";
import { AsideMenu } from "./AsideMenu";
import { ANIMATION } from "../shared/animations";
import { AsideToDo } from "./AsideToDo";
import { AsideTimer } from "./AsideTimer";

export const Aside: React.FC<AsideProps> = ({ indexes, handleIndexes, viewAside, handleAside, clearIndexes }) => {


    const animateAside = {
        x: viewAside ? '-200%' : '0%'
    }

    const initialAside = { x: '-200%' }


    return (
        <motion.div
            initial={initialAside}
            animate={animateAside}
            transition={{
                duration: 0.5,
                ease: 'easeInOut'
            }}
            className={`absolute left-0 bottom-0 h-full overflow-hidden text-[var(--light)] w-[20%] min-w-[300px] z-3  flex gap-3`}
        >
            <AsideMenu indexes={indexes} handleIndexes={handleIndexes} handleAside={handleAside} />
            <AnimatePresence mode="wait">
                {indexes.asidemenu === 0 && (
                    <motion.div
                        key="ToDo"
                        {...ANIMATION.slide}
                        className="overflow-hidden relative w-full"
                    >
                        <AsideToDo indexes={indexes} handleIndexes={handleIndexes} handleAside={handleAside} clearIndexes={clearIndexes} />
                        
                    </motion.div>
                )}
                {indexes.asidemenu === 1 && (
                    <motion.div
                        key="Timer"
                        {...ANIMATION.slide}
                        className="overflow-hidden relative w-full"
                    >
                        <AsideTimer handleAside={handleAside} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};