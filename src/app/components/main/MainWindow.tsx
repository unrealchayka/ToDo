'use client'

import { motion, AnimatePresence } from "framer-motion";
import { ImCross } from "react-icons/im";
import { AppContext } from "../provider/AppProvider";
import { useContext } from "react";
import { AiFillMoon } from "../shared/icons";
import Image from "next/image";
import { Timer } from "../aside/Timer";
import { Aside } from "../aside/Aside";
import { DertailTask } from "./DertailTask";

export const MainWindow = () => {
  const { borderColor, handleBorderColor, indexes } = useContext(AppContext)
  return (
    <motion.div className={`w-full h-full relative bg-dark p-4 border-10`}>
      <span><Image className={`absolute top-4 right-4  z-5 ${borderColor}  transition-all duration-1000 bg-[var(--color-1)] w-40 h-12  flex justify-center items-center gap-7 p-2 text-[25px] border-b-2 border-l-2  text-[white] cursor-pointer`} src='svg/note.svg' width={0} height={0} alt='note' /></span>
      <motion.div className={`absolute z-5 ${borderColor}  transition-all duration-1000 bg-[var(--color-1)] w-50 flex justify-center items-center gap-7 h-10 p-1 px-3 top-4 left-4 text-[25px] border-b-2 border-r-2  text-[white] cursor-pointer`}>
        <ImCross className="text-[var(--color-5)] hover:scale-125 transition-all duration-300" />
        <ImCross className="text-[var(--color-5)] hover:scale-125 transition-all duration-300" />
        <ImCross className="text-[var(--color-5)] hover:scale-125 transition-all duration-300" />
        <ImCross className="text-[var(--color-5)] hover:scale-125 transition-all duration-300" />
      </motion.div>
      <span className={`absolute text-[var(--color-5)] z-5 ${borderColor} transition-all duration-1000 border-t-2 border-r-2 bottom-4 left-4 p-1 bg-[var(--color-1)] w-30 h-10`}>
        <AiFillMoon className="transition-all duration-1000 w-full h-full hover:scale-125" />
      </span>
      <motion.div className={`absolute z-10 ${borderColor}  transition-all duration-1000 bg-[var(--color-1)] w-60 flex justify-center items-center gap-7 h-10 p-1 z-[4] bottom-4 right-4 text-[25px] border-t-2 border-l-2`}>
        <ImCross
          onClick={() => { handleBorderColor('border-[var(--color-5)]') }}
          className="text-[var(--color-5)] hover:scale-125 transition-all duration-300" />
        <ImCross
          onClick={() => { handleBorderColor('border-[var(--color-6)]') }}
          className="text-[var(--color-6)] hover:scale-125 transition-all duration-300" />
        <ImCross
          onClick={() => { handleBorderColor('border-[var(--color-7)]') }}
          className="text-[var(--color-7)] hover:scale-125 transition-all duration-300" />
        <ImCross
          onClick={() => { handleBorderColor('border-[var(--color-8)]') }}
          className="text-[var(--color-8)] hover:scale-125 transition-all duration-300" />
      </motion.div>


      <motion.div className={`flex justify-between tasks-gradient transition-all z-1 duration-1000 relative border-2 ${borderColor} w-full h-full`}>
        <AnimatePresence>
          <motion.div
            key="Aside"
            layoutId="Aside"
            className={`relative z-5 ${indexes.asidemenu === 0 ? 'w-[25%]': 'w-0'}`}>
            <Aside />
          </motion.div>
          <motion.div
            key="DertailTask"
            layoutId="DertailTask"
            className={`relative w-[65%] py-5`}>
            <DertailTask />
          </motion.div>
          <motion.div 
            key="Timer"
            layoutId="Timer"
            className={`relative z-5 overflow-hidden ${indexes.asidemenu === 1 ? 'w-[25%]': 'w-0'}`}>
            <Timer/>
          </motion.div>
        </AnimatePresence>
      </motion.div>



    </motion.div>
  );
};