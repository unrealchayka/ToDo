'use client'
import { AsideProps, Indexes } from "../shared/types";
import { ACTIVE_COLORS } from "../shared/constants";
import { RiTimerFlashLine, BsCalendarDay, BsCalendarWeek, IoCalendarNumberOutline, FaBoxArchive, VscListSelection, TbFilters, FaExclamationTriangle, CgCheckO, IoIosCloseCircleOutline } from '../shared/icons'
import { motion } from "framer-motion";


export const  AsideToDo: React.FC<AsideProps> = ({ indexes, handleIndexes, handleAside }) => {
    const dataSections = [
        {
            title: 'Dedlines',
            icon: <RiTimerFlashLine />,
            color: ACTIVE_COLORS.orange,
            items: [
                { title: 'Day', icon: <BsCalendarDay />, count: '11' },
                { title: 'Week', icon: <BsCalendarWeek />, count: '24' },
                { title: 'Month', icon: <IoCalendarNumberOutline />, count: '41' },
                { title: 'Letter', icon: <FaBoxArchive />, count: '11' }
            ],
            indexKey: 'orangeIndex'
        },
        {
            title: 'Lists',
            icon: <VscListSelection />,
            color: ACTIVE_COLORS.green,
            items: [
                { title: '🖥️ Work Tasks', icon: '', count: '35' },
                { title: '📖 Study Goals', icon: '', count: '50' },
                { title: '🛫 Travel Plans', icon: '', count: '14' },
                { title: '🎯 Daily To-Dos', icon: '', count: '25' },
                { title: '🍀 Life Errands', icon: '', count: '7' }
            ],
            indexKey: 'greenIndex'
        },
        {
            title: 'Filters',
            icon: <TbFilters />,
            color: ACTIVE_COLORS.purple,
            items: [
                { title: 'This Week', icon: <BsCalendarWeek />, count: '44' },
                { title: 'Unfinished', icon: <FaExclamationTriangle />, count: '6' },
                { title: 'Completed', icon: <CgCheckO />, count: '60' }
            ],
            indexKey: 'purpleIndex'
        }
    ];

    return (
        <motion.div className="z-1 text-[13px] sm:text-[16px] 3xl:text-[20px] whitespace-nowrap absolute flex flex-col gap-2 3xl:gap-8 w-full h-full rounded-xl rounded-l-[0]">
            
            {dataSections.map((section) => (
                <div key={section.title} className="px-5 pt-2">
                    <p className="mb-1 pt-0 flex gap-2 items-center" style={{ color: section.color }}>
                        {section.title} {section.icon}
                    </p>
                    <motion.ul layout className="w-full inline-flex flex-col gap-3">
                        {section.items.map((item, index) => {
                            const isActive = index === indexes[section.indexKey as keyof Indexes];
                            return (
                                <motion.li
                                    key={`${section.title}-${index}`}
                                    onClick={() => handleIndexes(section.indexKey as keyof Indexes, isActive ? -1 : index)}
                                    className="relative cursor-pointer flex justify-between w-full transition-all"
                                >
                                    <span className={`flex gap-2 relative z-10 items-center transition-colors duration-600 ${isActive ? 'text-[var(--color-1)] font-[900]' : ''}`}>
                                        {item.icon && item.icon} {item.title}
                                    </span>
                                    <span className="relative z-10">{item.count}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId={`${section.indexKey}Indicator`}
                                            className="absolute z-0 w-[110%] h-5 sm:h-7 3xl:h-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                                            style={{ backgroundColor: section.color }}
                                        />
                                    )}
                                </motion.li>
                            );
                        })}
                    </motion.ul>
                </div>
            ))}
        </motion.div>
    );
};