'use client'

import { MainWindowProps } from "../shared/types";
import { motion } from "framer-motion";
import { FaAnglesLeft } from "react-icons/fa6";
import { Aside } from "../aside/Aside";
import { ImCross } from "react-icons/im";
import { useState } from "react";

export const MainWindow: React.FC<MainWindowProps> = ({ data, handleAside, indexes, handleIndexes, viewAside, clearIndexes}) => {
  const [borderColor, setBorderColor] = useState<string>('border-[var(--color-5)]')

  function handleBorderColor(color: string){
    setBorderColor(color)
  }
  return (
    <motion.div

      className={`w-full right-0 top-0 bg-dark h-full p-4`}
    >
      <motion.div
        className={`absolute ${borderColor} transition-all duration-1000 bg-[var(--color-1)] w-20 flex justify-center items-center gap-7 h-10 p-1 z-[4] top-4 left-4 text-[25px] border-b-2 border-r-2  text-[white] cursor-pointer`}
        onClick={handleAside}>
        <motion.div className="relative z-5"
          initial={{rotate: 0}}
          transition={{ duration: .5, ease: 'linear'}}
          animate={{rotate: viewAside ? 0 : 180}}>
          <FaAnglesLeft className="text-[var(--color-5)] hover:scale-125 transition-all duration-300"/>
        </motion.div>
      </motion.div>

      <motion.div className={`absolute ${borderColor}  transition-all duration-1000 bg-[var(--color-1)] w-60 flex justify-center items-center gap-7 h-10 p-1 z-[4] bottom-4 right-4 text-[25px] border-t-2 border-l-2`}>
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


      <motion.div className={`transition-all duration-1000 relative overflow-hidden border-2 ${borderColor} bg-[var(--light)]/5 w-full h-full`}>
        <Aside data={data} indexes={indexes} handleIndexes={handleIndexes} viewAside={viewAside} handleAside={handleAside} clearIndexes={clearIndexes}  />
        
        
        
      </motion.div>

        
    </motion.div>
  );
};