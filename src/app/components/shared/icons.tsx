'use client'
import {
    IoCalendar, IoCalendarNumberOutline, IoSearch, IoNotifications,
    IoInformationCircleOutline
} from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsCalendarDay, BsCalendarWeek } from "react-icons/bs";
import { FaBoxArchive, FaNoteSticky } from "react-icons/fa6";
import { FaExclamationTriangle } from "react-icons/fa";
import { VscListSelection } from "react-icons/vsc";
import { RiTimerFlashLine } from "react-icons/ri";
import { TbFilters } from "react-icons/tb";
import { TfiReload } from "react-icons/tfi";
import { CgCheckO } from "react-icons/cg";
import { RxLapTimer } from "react-icons/rx";
import { HiMiniCube } from "react-icons/hi2";
import { FaHamburger } from "react-icons/fa";
import { motion } from "framer-motion";


const IconItem: React.FC<{
    icon: React.ReactNode;
    active: boolean;
    onClick: () => void;
    color: string;
}> = ({ icon, active, onClick }) => (
    <motion.li
        className={`relative cursor-pointer ${!active && 'hover:text-[var(--color-8)]'}`}
        onClick={onClick}
    >
        <motion.span className={`relative z-10 transition-colors duration-700 ${active && 'text-[var(--color-1)]'}`}>
            {icon}
        </motion.span>
        {active && (
            <motion.div
                layoutId="activeIndicator"
                className={`bg-[var(--color-8)] z-0 w-5 h-5 sm:w-10 sm:h-10 top-[50%] left-[50%] translate-[-50%] rounded-full absolute`}
            />
        )}
    </motion.li>
);

const firstIconList = [
    { id: 'note', icon: <FaNoteSticky /> },
    { id: 'timer', icon: <RxLapTimer /> },
    { id: 'cube', icon: <HiMiniCube /> },
    { id: 'calendar', icon: <IoCalendar /> },
    { id: 'search', icon: <IoSearch /> }
];

const secondIconList = [
    { id: 'reload', icon: <TfiReload /> },
    { id: 'notifications', icon: <IoNotifications /> },
    { id: 'info', icon: <IoInformationCircleOutline /> }
];


export {
    IoCalendar, IoCalendarNumberOutline, IoSearch, IoNotifications,IoInformationCircleOutline,
    IoIosCloseCircleOutline, BsCalendarDay, BsCalendarWeek, FaBoxArchive, FaExclamationTriangle,
    VscListSelection,RiTimerFlashLine,TbFilters, CgCheckO, FaHamburger,
    IconItem, firstIconList, secondIconList
}