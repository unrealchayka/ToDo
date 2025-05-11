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
        <div className={`flex absolute z-8 flex-col justify-center gap-30 xl:gap-60 items-center text-[25px] h-full md:text-[30px] text-[var(--color-3)] rounded-xl rounded-r-none`}>
            <div>
                <motion.ul layout className="justify-center items-center inline-flex flex-col gap-3 p-2 md:p-5 ">
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
                <motion.ul layout className="h-full text-[18px] inline-flex flex-col gap-3 p-2 pb-4 md:p-5">
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
