'use client'
import { Indexes, TaskCategory } from "../shared/types";
import { ToDoTasks } from '../shared/constants'
import { createContext, useCallback, useMemo, useState, memo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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

export const AppContext = createContext<AppProviderContextType>(null!);

export const AppProvider = memo(({ children, className }: { children: React.ReactNode, className?: string }) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // Данные считаются свежими 1 минуту
        refetchOnWindowFocus: false, // Не обновлять при переключении вкладок
        retry: 1, // Количество попыток повторного запроса при ошибке
      },
    },
  }))

  // Состояния
  const [viewAside, setViewAside] = useState(false);
  const [indexes, setIndexes] = useState<Indexes>({
    asidemenu: 0,
    timer: null,
    cube: null,
    calendar: null
  });
  const [theme, setTheme] = useState(false);
  const [borderColor, setBorderColor] = useState('border-[var(--color-5)]');
  const [filters, setFilters] = useState<Filters>({});
  const [originalTasks] = useState(ToDoTasks);

  // Обработчики с useCallback
  const handleAside = useCallback(() => {
    setViewAside(prev => !prev);
  }, []);

  const clearIndexes = useCallback(() => {
    setIndexes({
      asidemenu: 0,
      timer: null,
      cube: null,
      calendar: null
    });
  }, []);

  const handleIndexes = useCallback((nameIndex: keyof Indexes, value: number) => {
    setIndexes(prev => ({
      ...prev,
      [nameIndex]: prev[nameIndex] === value ? null : value
    }));
  }, []);

  const handleTheme = useCallback(() => {
    setTheme(prev => !prev);
  }, []);

  const handleBorderColor = useCallback((color: string) => {
    setBorderColor(color);
  }, []);

  // Фильтрация задач
  const filteredTasks = useMemo(() => {
    let result = [...originalTasks];

    if (filters.date) {
      const today = new Date();
      const endDate = new Date();

      switch (filters.date) {
        case 'day': endDate.setDate(today.getDate() + 1); break;
        case 'week': endDate.setDate(today.getDate() + 7); break;
        case 'month': endDate.setMonth(today.getMonth() + 1); break;
      }

     
    }

    if (filters.category) {
      result = result
        .filter(category => category.title.includes(filters.category!))
        .map(category => ({
          ...category,
          tasks: [...category.tasks]
        }));
    }

    if (typeof filters.completed === 'boolean') {
      result = result
        .map(category => ({
          ...category,
          tasks: category.tasks.filter(task => task.finished === filters.completed)
        }))
        .filter(category => category.tasks.length > 0);
    }

    return result;
  }, [originalTasks, filters]);

  // Функции фильтрации
  const updateFilters = useCallback((key: keyof Filters, value?: any) => {
    setFilters(prev => {
      if (prev[key] === value) {
        const newFilters = { ...prev };
        delete newFilters[key];
        return newFilters;
      }
      return { ...prev, [key]: value };
    });
  }, []);

  const filterByDate = useCallback((period?: string) => {
    updateFilters('date', period);
  }, [updateFilters]);

  const filterByCategory = useCallback((category?: string) => {
    updateFilters('category', category);
  }, [updateFilters]);

  const filterByCompletion = useCallback((completed?: boolean) => {
    updateFilters('completed', completed);
  }, [updateFilters]);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Мемоизированное значение контекста
  const contextValue = useMemo(() => ({
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
    viewAside,
    handleAside,
  }), [
    indexes, handleIndexes, clearIndexes,
    theme, handleTheme,
    borderColor, handleBorderColor,
    filteredTasks, originalTasks,
    filterByDate, filterByCategory, filterByCompletion, resetFilters,
    viewAside, handleAside
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={contextValue}>
        <div className={className}>
          {children}
        </div>
      </AppContext.Provider>
      {/* Инструменты для разработки */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
});

AppProvider.displayName = 'AppProvider'; // Для корректной работы React DevTools