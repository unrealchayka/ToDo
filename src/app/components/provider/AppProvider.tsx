'use client'
import { Indexes, TaskCategory } from "../shared/types";
import { ToDoTasks } from '../shared/constants'
import { createContext, useState } from 'react';


interface AppProviderContextType {
    data: TaskCategory[];
    setData: React.Dispatch<React.SetStateAction<TaskCategory[]>>;
    viewAside: boolean;
    handleAside: () => void;
    indexes: Indexes;
    handleIndexes: (nameIndex: keyof Indexes, value: number) => void;
    clearIndexes: () => void;
    theme: boolean;
    handleTheme: () => void;
    borderColor: string;
    handleBorderColor: (color:string)=>void
}

export const AppContext = createContext<AppProviderContextType>({
    data: [],
    setData: () => { },
    viewAside: false,
    handleAside: () => { },
    indexes: { asidemenu: null, timer: null, cube: null, calendar: null },
    handleIndexes: () => { },
    clearIndexes: () => { },
    theme: false,
    handleTheme: () => { },
    borderColor: '',
    handleBorderColor: () => { },
});

export const AppProvider = ({ children, className }: { children: React.ReactNode, className?: string }) => {

    const [data, setData] = useState(ToDoTasks)
    const [viewAside, setViewAside] = useState<boolean>(false);
    function handleAside() {setViewAside(!viewAside)};
    const [indexes, setIndexes] = useState<Indexes>({
        asidemenu: null,
        timer: null,
        cube: null,
        calendar: null
    });
    function clearIndexes() {
        setIndexes({
            asidemenu: 0,
            timer: null,
            cube: null,
            calendar: null
        });
    }
    const handleIndexes = (nameIndex: keyof Indexes, value: number) => {
        if (indexes[nameIndex] === value) {
            setIndexes({ ...indexes, [nameIndex]: null });
        } else {
            setIndexes({ ...indexes, [nameIndex]: value });
        }
    };

    const [theme, settheme] = useState<boolean>(false);
    function handleTheme() {
        settheme(!theme);
        console.log(theme)
    };

    const [borderColor, setBorderColor] = useState<string>('border-[var(--color-5)]')

    function handleBorderColor(color: string){
        setBorderColor(color)
    }

    const value = {
        data,
        setData,
        viewAside,
        handleAside,
        indexes,
        handleIndexes,
        clearIndexes,
        theme,
        handleTheme,
        borderColor,
        handleBorderColor,
    };
    return (
        <AppContext.Provider value={value}>
            <div className={className}>
                {children}  
            </div>
        </AppContext.Provider>
    );
};
