'use client';
import { IconItem } from '../shared/icons'
import { firstIconList, secondIconList } from '../shared/icons';
import { ACTIVE_COLORS } from '../shared/constants';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AppContext } from "../provider/AppProvider";


export const AsideMenu = () => {
    const context = useContext(AppContext);
    const {indexes, handleIndexes} = context;
   
    return (
        <div className={`flex absolute bottom-2 z-8 sm:flex-col w-full sm:w-auto justify-center sm:gap-30 xl:gap-60 items-center text-[25px] sm:h-full md:text-[30px] text-[var(--color-3)] rounded-xl rounded-r-none`}>
            <div>
                <motion.ul layout className="justify-center items-center inline-flex sm:flex-col gap-3 p-2 md:p-5 ">
                    {firstIconList.map((icon, index) => (
                        <IconItem
                            key={icon.id}
                            icon={icon}
                            active={index === indexes.asidemenu}
                            onClick={() => handleIndexes('asidemenu', index)}
                            color={ACTIVE_COLORS.blue}
                        />
                    ))}
                </motion.ul>
            </div>

            <div>
                <motion.ul layout className="hidden h-full text-[18px] sm:inline-flex items-center sm:flex-col gap-3 p-2 sm:pb-4 md:p-5">
                    {secondIconList.map((icon, index) => (
                        <motion.li
                            key={icon.id}
                            className="relative cursor-pointer transition-all hover:scale-125"
                            whileHover={index === 0 ? { rotate: -360 } : {}}
                            transition={{ duration: index === 0 ? 1 : 0.3 }}
                        >
                           {icon.icon}
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </div>
    );
};
