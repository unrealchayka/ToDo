'use client'

import { MainWindowProps } from "../shared/types";
import { motion } from "framer-motion";
import { FaAnglesLeft } from "react-icons/fa6";

export const MainWindow: React.FC<MainWindowProps> = ({ handleAside }) => {
  
    return (
      <motion.div
        
        className={`absolute border border-[var(--color-6)] w-full right-0 top-0 bg-dark h-full p-4 rounded-3xl`}
      >
        <div
          className='absolute top-7 left-7 text-[25px] text-[white] transition-all duration-500 hover:text-[var(--blue)] cursor-pointer'
          onClick={handleAside}
        >
          <FaAnglesLeft />
        </div>
        <div className="border-hover w-full h-full rounded-xl"></div>
      </motion.div>
    );
  };