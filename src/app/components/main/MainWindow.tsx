'use client'

import { motion } from "framer-motion";
import { FaAnglesLeft } from "react-icons/fa6";
import { Aside } from "../aside/Aside";
import { ImCross } from "react-icons/im";
import { AppContext } from "../provider/AppProvider";
import { useContext } from "react";
import { DertailTask } from "./DertailTask";

export const MainWindow = () => {
  const {handleAside, viewAside, borderColor, handleBorderColor} = useContext(AppContext)
  return (
    <motion.div

      className={`w-full h-full right-0 top-0 bg-dark p-4`}
    >
      <motion.div
        className={`absolute z-5 ${borderColor}  transition-all duration-1000 bg-[var(--color-1)] w-15 flex justify-center items-center gap-7 h-10 p-1 top-4 left-4 text-[25px] border-b-2 border-r-2  text-[white] cursor-pointer`}
        onClick={handleAside}>
        <motion.div className="relative"
          initial={{rotate: 0}}
          transition={{ duration: .5, ease: 'linear'}}
          animate={{rotate: viewAside ? 0 : 180}}>
          <FaAnglesLeft className="text-[var(--color-5)] hover:scale-125 transition-all duration-300"/>
        </motion.div>
      </motion.div>

      <motion.div className={`absolute z-10 ${borderColor}  transition-all duration-1000 bg-[var(--color-1)] w-60 flex justify-center items-center gap-7 h-10 p-1 z-[4] bottom-4 right-4 text-[25px] border-t-2 border-l-2`}>
          <ImCross 
            onClick={()=>{handleBorderColor('border-[var(--color-5)]')}}
          className="text-[var(--color-5)] hover:scale-125 transition-all duration-300"/>
          <ImCross 
            onClick={()=>{handleBorderColor('border-[var(--color-6)]')}}
          className="text-[var(--color-6)] hover:scale-125 transition-all duration-300"/>
          <ImCross 
            onClick={()=>{handleBorderColor('border-[var(--color-7)]')}}
          className="text-[var(--color-7)] hover:scale-125 transition-all duration-300"/>
          <ImCross 
            onClick={()=>{handleBorderColor('border-[var(--color-8)]')}}
          className="text-[var(--color-8)] hover:scale-125 transition-all duration-300"/>
      </motion.div>


      <motion.div className={`transition-all z-1 duration-1000 relative border-2 ${borderColor} bg-[var(--light)]/5 w-full h-full`}>
        <Aside />
        <DertailTask/>
      </motion.div>
    

          
    </motion.div>
  );
};