'use client'
import { AsideProps } from "../shared/types";
import { AnimatePresence, motion } from "framer-motion";
import { AsideMenu } from "./AsideMenu";
import { ANIMATION } from "../shared/animations";
import { AsideToDo } from "./AsideToDo";
import { AsideTimer } from "./AsideTimer";

export const Aside: React.FC<AsideProps> = ({ indexes, handleIndexes, viewAside, handleAside }) => {


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
            className={`absolute border border-[var(--color-7)] left-0 bg-dark max-h-[100vh] h-full overflow-hidden text-[var(--light)] w-[25%] min-w-[350px] z-3  flex gap-3 rounded-3xl p-4`}
        >   
            <AsideMenu indexes={indexes} handleIndexes={handleIndexes} handleAside={handleAside} />
            <AnimatePresence mode="wait">
                {indexes.blueIndex === 0 && (
                    <motion.div
                        key="ToDo"
                        {...ANIMATION.slide}
                        className="overflow-hidden relative w-full"
                    >
                        <AsideToDo indexes={indexes} handleIndexes={handleIndexes} handleAside={handleAside} />
                    </motion.div>
                )}
                {indexes.blueIndex === 1 && (
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