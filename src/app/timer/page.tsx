'use client'
import { motion } from "framer-motion";
import { ANIMATION } from "../components/shared/animations";
import { Timer } from "../components/aside/Timer";

export default function timer(){
  return (
      <motion.div
        className="w-full h-full relative flex"
        {...ANIMATION.slide}
        >
        <Timer/>
      </motion.div>
  );
}
