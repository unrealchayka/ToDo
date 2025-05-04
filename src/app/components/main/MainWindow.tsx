'use client'

import { MainWindowProps } from "../shared/types";
import { motion } from "framer-motion";
import { FaAnglesLeft } from "react-icons/fa6";
import { Aside } from "../aside/Aside";

export const MainWindow: React.FC<MainWindowProps> = ({ handleAside, indexes, handleIndexes, viewAside }) => {

  return (
    <motion.div

      className={`absolute w-full right-0 top-0 bg-dark h-full p-4`}
    >
      <motion.div
        className='absolute bg-[var(--color-1)] w-10 md:w-[80px] flex justify-center items-center h-10 p-1 z-[4] top-4 left-4 text-[25px] border-hover-open text-[white] transition-all duration-500 hover:text-[var(--blue)] cursor-pointer'
        onClick={handleAside}
      >
        <motion.div className="relative z-5"
          initial={{
            rotate: 0

          }}
          transition={{
            duration: .2,
            ease: 'linear'
          }}
          animate={{
            rotate: viewAside ? 0 : 180
          }}>
          <FaAnglesLeft />
        </motion.div>
      </motion.div>
      <div className="relative overflow-hidden border-hover w-full h-full">
        <Aside indexes={indexes} handleIndexes={handleIndexes} viewAside={viewAside} handleAside={handleAside} />
      </div>
    </motion.div>
  );
};