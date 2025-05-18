'use client'
import { motion } from "framer-motion";
import { Aside } from "../components/aside/Aside";
import { Tasks } from "../components/main/Tasks";
import { ANIMATION } from "../components/shared/animations";
import { useTasks } from "../hooks/useTasks";
import { useState } from "react";
import { Task } from "../components/shared/types";

export default function note() {
  const { data } = useTasks()
  const [tasks, setTasks] = useState<Task[] | undefined>(data)
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
        <Aside tasks={tasks} setTask={setTasks} />
      </motion.div>
      <motion.div
        key="DertailTask"
        layoutId="DertailTask"
        className={`hidden lg:block w-[30%] sm:w-[60%] xl:w-[70%] py-5`}>
        <Tasks tasks={tasks} setTask={setTasks} />
      </motion.div>
      {/* md: device end */}

    </motion.div>
  );
}
