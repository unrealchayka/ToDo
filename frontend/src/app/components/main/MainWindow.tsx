'use client'

import { motion, AnimatePresence } from "framer-motion";
import { ImCross } from "react-icons/im";
import { AppContext } from "../provider/AppProvider";
import { useContext } from "react";
import { AiFillMoon } from "../shared/icons";
import Image from "next/image";
import { AsideMenu } from "../aside/AsideMenu";

export const MainWindow = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { borderColor, handleBorderColor} = useContext(AppContext)
  return (
    <motion.div className={`w-full h-full relative bg-dark p-4 border-10`}>
      <span className="hidden lg:block"><Image className={`absolute top-4 right-4  z-5 ${borderColor}  transition-all duration-1000 bg-[var(--color-1)] w-40 h-12  flex justify-center items-center gap-7 p-2 text-[25px] border-b-2 border-l-2  text-[white] cursor-pointer`} src='svg/note.svg' width={0} height={0} alt='note' /></span>
      <motion.div className={`absolute z-5 hidden lg:flex ${borderColor}  transition-all duration-1000 bg-[var(--color-1)] w-50 flex justify-center items-center gap-7 h-10 p-1 px-3 top-4 left-4 text-[25px] border-b-2 border-r-2  text-[white] cursor-pointer`}>
        <ImCross className="text-[var(--color-5)] hover:scale-125 transition-all duration-300" />
        <ImCross className="text-[var(--color-5)] hover:scale-125 transition-all duration-300" />
        <ImCross className="text-[var(--color-5)] hover:scale-125 transition-all duration-300" />
        <ImCross className="text-[var(--color-5)] hover:scale-125 transition-all duration-300" />
      </motion.div>
      <span className={`absolute text-[var(--color-5)] z-5 hidden lg:block ${borderColor} transition-all duration-1000 border-t-2 border-r-2 bottom-4 left-4 p-1 bg-[var(--color-1)] w-30 h-10`}>
        <AiFillMoon className="transition-all duration-1000 w-full h-full hover:scale-125" />
      </span>
      <motion.div className={`absolute z-10 ${borderColor} hidden lg:flex  transition-all duration-1000 bg-[var(--color-1)] w-60 justify-center items-center gap-7 h-10 p-1 z-[4] bottom-4 right-4 text-[25px] border-t-2 border-l-2`}>
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


      <motion.div className={`tasks-gradient overflow-hidden transition-all z-1 duration-1000 relative border-2 ${borderColor} w-full h-full`}>
        <AsideMenu/>
        <AnimatePresence>
      
          {children}
          
        </AnimatePresence>
      </motion.div>



    </motion.div>
  );
};