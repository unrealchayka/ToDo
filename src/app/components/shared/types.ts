import { ReactNode } from 'react';

export interface Indexes{
    asidemenu: number | null;
    timer: number | null;
    cube: number | null;
    calendar: number | null;
}


export interface FilterItem {
    title: string;
    icon: ReactNode;
    count: string;
}
  
export interface FiltersDictionary {
    title: string;
    icon: ReactNode;
    color: string; // или более конкретный тип, если ACTIVE_COLORS имеет свою типизацию
    items: FilterItem[];
    indexKey: string; // или более конкретный тип, например: 'purpleIndex' | 'blueIndex' | etc
  }

export interface AsideToDoMenuType {
    section: FiltersDictionary; 
}
export interface AsideProps {
    data: TaskCategory[]
    indexes: Indexes;
    handleIndexes: (nameIndex: keyof Indexes, value: number) => void;
    viewAside?: boolean;
    handleAside?: () => void;
    clearIndexes?: () => void;

}

export interface TimerType {
    handleFullTimer?: () => void;
    fullTimer?: boolean
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