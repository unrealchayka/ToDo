export interface Props {
    className?: string;
}

export interface Indexes{
    asidemenu: number | null;
    timer: number | null;
    cube: number | null;
    calendar: number | null;
  }



export interface AsideProps {
    indexes: Indexes;
    handleIndexes: (nameIndex: keyof Indexes, value: number) => void;
    viewAside?: boolean;
    handleAside?: () => void;
    clearIndexes?: () => void;

}

export interface AsideWindows {
    handleAside?: () => void;
    clearIndexes?: () => void;

}

export interface MainWindowProps {
    handleAside?: () => void;
    viewAside: boolean;
    sizeWindowBool?: boolean;
    indexes: Indexes;
    handleIndexes: (nameIndex: keyof Indexes, value: number) => void;
    clearIndexes: () => void;
}

export interface Task {
    id: string;
    title: string;
    dateTimeCreated: string;
    executionDay: string;
    timeToComplete: string;
    priority: 'low' | 'medium' | 'high';
    finished: boolean;
    notes?: string;
  }
  
export interface TaskCategory {
    id: string;
    title: string;
    icon: string;
    tasks: Task[];
}
export interface DateFilterResult {
    today: Task[];
    nextWeek: Task[];
    nextMonth: Task[];
    later: Task[];
    letter: Task[];
  }
  
export interface CategoryFilterResult {
    [categoryTitle: string]: Task[];
}