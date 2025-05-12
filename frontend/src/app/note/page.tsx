'use client'
import { motion } from "framer-motion";
import { Aside } from "../components/aside/Aside";
import { DertailTask } from "../components/main/DertailTask";
import { ANIMATION } from "../components/shared/animations";

export default function note () {
  return (
      <motion.div
      className="relative flex justify-between gap-3 w-full h-full"
      {...ANIMATION.slide}
      > 

      {/* md: device > */}
        <motion.div
          key="Aside"
          layoutId="Aside"
          className={`hidden lg:block w-[20%] sm:w-[25%] z-5`}>
          <Aside />
        </motion.div>
        <motion.div
          key="DertailTask"
          layoutId="DertailTask"
          className={`hidden lg:block w-[30%] sm:w-[60%] xl:w-[70%] py-5`}>
          <DertailTask />
        </motion.div>
      {/* md: device end */}

    </motion.div>
  );
}
