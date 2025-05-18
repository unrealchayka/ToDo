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
interface Tag{
    id: number;
    title: string;
}

interface UserData {
    username: string;
    email: string;
    user_id: number;
}
interface Comments{
    id: number;
    author: UserData;
    text: string;
    created_at: string;
    updated_at: string;
}

interface Attachments{
    id: number;
    file: string;
    uploaded_by: UserData;
    uploaded_at: string;
}

export interface Task {
    id: number;
    title: string;
    description: string
    completed: boolean
    created_at: string;
    updated_at: string;
    due_date: string;
    timeToComplete: string;
    category?: string | null;
    tags?: Tag[] | null;
    user: UserData;
    comments: Comments;
    attachments:Attachments;
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