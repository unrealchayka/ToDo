'use client';
import { IconItem } from '../shared/icons'
import { firstIconList, secondIconList } from '../shared/icons';
import { AsideProps } from '../shared/types';
import { ACTIVE_COLORS } from '../shared/constants';
import { motion } from 'framer-motion';

export const AsideMenu: React.FC<AsideProps> = ({ indexes, handleIndexes }) => {

    return (
        <div className={`flex flex-col justify-between items-center text-[15px] md:text-[25px] text-[var(--color-3)] rounded-xl pt-10 rounded-r-none`}>
            <div>
                <motion.ul layout className="h-full justify-center items-center inline-flex flex-col gap-3 p-2 md:p-5 ">
                    {firstIconList.map((icon, index) => (
                        <IconItem
                            key={icon.id}
                            icon={icon.icon}
                            active={index === indexes.blueIndex}
                            onClick={() => handleIndexes('blueIndex', index)}
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
