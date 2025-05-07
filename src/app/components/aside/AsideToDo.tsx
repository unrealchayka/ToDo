'use client'
import { AsideProps, FiltersDictionary, Indexes, AsideToDoMenuType, AsideToDoTaskTypes } from "../shared/types";
import { ACTIVE_COLORS } from "../shared/constants";
import { RiTimerFlashLine, BsCalendarDay, BsCalendarWeek, IoCalendarNumberOutline, FaBoxArchive, VscListSelection, TbFilters, FaExclamationTriangle, CgCheckO, GrClearOption } from '../shared/icons'
import { motion } from "framer-motion";



const AsideToDoMenu: React.FC<AsideToDoMenuType> = ({section, indexes, handleIndexes})=>{
    return(
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
    )
}


const AsideToDoTask: React.FC<AsideToDoTaskTypes> = ({ data, indexes, handleIndexes})=>{
    const dataSections = 
        {
            title: 'Tasks',
            icon: <VscListSelection />,
            color: ACTIVE_COLORS.green,
            
            indexKey: 'greenIndex'
        };
    return(
        <div key={dataSections.title} className="px-5 pt-2 overflow-y-scroll scroll-bar">
                    <p className="mb-1 pt-0 flex gap-2 items-center" style={{ color: dataSections.color }}>
                        {dataSections.title} {dataSections.icon}
                    </p>
                    <motion.ul layout className="w-full inline-flex flex-col gap-3">
                        {data.map((item, index) => {
                            const isActive = index === indexes[dataSections.indexKey as keyof Indexes];
                            return (
                                <motion.li
                                    key={`${dataSections.title}-${index}`}
                                    onClick={() => handleIndexes(dataSections.indexKey as keyof Indexes, isActive ? -1 : index)}
                                    className="relative cursor-pointer flex justify-between w-full transition-all"
                                >
                                    <span className={`flex gap-2 relative z-10 items-center transition-colors duration-600 ${isActive ? 'text-[var(--color-1)] font-[900]' : ''}`}>
                                         {item.title}
                                    </span>
                                    <span className="relative z-10">{item.tasks.length}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId={`${dataSections.indexKey}Indicator`}
                                            className="absolute z-0 w-[110%] h-5 sm:h-7 3xl:h-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                                            style={{ backgroundColor: dataSections.color }}
                                        />
                                    )}
                                </motion.li>
                            );
                        })}
                    </motion.ul>
                </div>
    )
}

export const AsideToDo: React.FC<AsideProps> = ({ data,  indexes, handleIndexes, clearIndexes }) => {
    const dedlines: FiltersDictionary={
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
    }
    const filters: FiltersDictionary = {
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

    return (
        <motion.div className="z-1 text-[13px] sm:border-r-2 sm:border-[var(--color-5)] sm:text-[18px] whitespace-nowrap flex flex-col justify-center gap-2 3xl:gap-8 w-full h-full">

            <AsideToDoMenu section={dedlines} indexes={indexes} handleIndexes={handleIndexes}/>
            <AsideToDoTask data={data} indexes={indexes} handleIndexes={handleIndexes}/>
            <AsideToDoMenu section={filters} indexes={indexes} handleIndexes={handleIndexes}/>
            <motion.div
                onClick={clearIndexes}
                className="text-[--light] bottom-10 left-[30%] px-5 pt-5 flex justify-start gap-5 items-center cursor-pointer z-5 text-center w-full"
            >
                <span className="w-8 h-8 flex justify-center  text-[var(--dark)] items-center bg-[var(--color-7)] text-[20px] rounded-full">
                    <GrClearOption />
                </span>
                Clear Filtres
            </motion.div>
        </motion.div>
    );
};