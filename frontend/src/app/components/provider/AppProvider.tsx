'use client'
import { Indexes, TaskCategory } from "../shared/types";
import { ToDoTasks } from '../shared/constants'
import { createContext, useCallback, useMemo, useState } from 'react';


interface AppProviderContextType {
    indexes: Indexes;
    handleIndexes: (nameIndex: keyof Indexes, value: number) => void;
    clearIndexes: () => void;
    theme: boolean;
    handleTheme: () => void;
    borderColor: string;
    handleBorderColor: (color: string) => void;
    filteredTasks: TaskCategory[];
    originalTasks: TaskCategory[];
    filterByDate: (period?: string) => void;
    filterByCategory: (title: string) => void;
    filterByCompletion: (completed: boolean) => void;
    resetFilters: () => void;
    viewAside: boolean;
    handleAside: (value: boolean) => void;
}

interface Filters {
    date?: string;
    category?: string;
    completed?: boolean;
  }

export const AppContext = createContext<AppProviderContextType>({
    indexes: { asidemenu: null, timer: null, cube: null, calendar: null },
  handleIndexes: () => console.warn('handleIndexes function not implemented'),
  clearIndexes: () => console.warn('clearIndexes function not implemented'),
  theme: false,
  handleTheme: () => console.warn('handleTheme function not implemented'),
  borderColor: '',
  handleBorderColor: () => console.warn('handleBorderColor function not implemented'),
  filteredTasks: [],
  originalTasks: [],
  filterByDate: () => console.warn('filterByDate function not implemented'),
  filterByCategory: () => console.warn('filterByCategory function not implemented'),
  filterByCompletion: () => console.warn('filterByCompletion function not implemented'),
  resetFilters: () => console.warn('resetFilters function not implemented'),
  viewAside: false,
  handleAside: () => console.warn('handleAside function not implemented'),
});

export const AppProvider = ({ children, className }: { children: React.ReactNode, className?: string }) => {

    const [viewAside, setViewAside] = useState<boolean>(false);
    function handleAside() { setViewAside(!viewAside) };
    const [indexes, setIndexes] = useState<Indexes>({
        asidemenu: 0,
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

    function handleBorderColor(color: string) {
        setBorderColor(color)
    }

    const [originalTasks] = useState<TaskCategory[]>(ToDoTasks);
    const [filters, setFilters] = useState<Filters>({});


  // Применяем все фильтры последовательно
    const filteredTasks = useMemo(() => {
    let result = [...originalTasks];
    // Фильтрация по дате
    if (filters.date) {
      const today = new Date();
      const endDate = new Date();
      
      switch (filters.date) {
        case 'day':
          endDate.setDate(today.getDate() + 1);
          break;
        case 'week':
          endDate.setDate(today.getDate() + 7);
          break;
        case 'month':
          endDate.setMonth(today.getMonth() + 1);
          break;
      }
      
      result = result.map(category => ({
        ...category,
        tasks: category.tasks.filter(task => {
          const taskDate = new Date(task.executionDay);
          return taskDate >= today && taskDate <= endDate;
        })
      })).filter(category => category.tasks.length > 0);
    }
    
    // Фильтрация по категории
    if (filters.category) {
      result = result
        .filter(category => category.title.includes(filters.category!))
        .map(category => ({
          ...category,
          tasks: [...category.tasks]
        }));
    }
    
    // Фильтрация по статусу
    if (typeof filters.completed === 'boolean') {
      result = result.map(category => ({
        ...category,
        tasks: category.tasks.filter(task => task.finished === filters.completed)
      })).filter(category => category.tasks.length > 0);
    }
    
    return result;
  }, [originalTasks, filters]);

  // Функции для установки фильтров
  const filterByDate = useCallback((period?: string) => {
    setFilters(prev => {
      if (prev.date === period) {
        const newFilters = { ...prev }; // Создаем копию
            delete newFilters.date;    // Удаляем свойство
            return newFilters;
      }
      return { ...prev, period };
    });
  }, []);

  const filterByCategory = useCallback((category?: string) => {
        setFilters(prev => {
          if (prev.category === category) {
            const newFilters = { ...prev }; // Создаем копию
            delete newFilters.category;    // Удаляем свойство
            return newFilters;
          }
          return { ...prev, category: category };
        });
  }, []);

  const filterByCompletion = useCallback((completed?: boolean) => {
    setFilters(prev => {
      if (prev.completed === completed) {
        const newFilters = { ...prev }; // Создаем копию
            delete newFilters.completed;    // Удаляем свойство
            return newFilters;
      }
      return { ...prev, completed };
    });
  }, []);
  const resetFilters  = useCallback(() => {
    setFilters({});
  }, []);
  console.log(filters)
    const value = {
        indexes,
        handleIndexes,
        clearIndexes,
        theme,
        handleTheme,
        borderColor,
        handleBorderColor,
        filteredTasks,
        originalTasks,
        filterByDate,
        filterByCategory,
        filterByCompletion,
        resetFilters,
        handleAside,
        viewAside,
    };
    return (
        <AppContext.Provider value={value}>
            <div className={className}>
                {children}
            </div>
        </AppContext.Provider>
    );
};
