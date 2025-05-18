import { Task } from "../shared/types";

export const fetchTasks = async (): Promise<Task[] | undefined> => {
    try {
        const accessToken = localStorage.getItem('access_token');

        const response = await fetch('http://localhost:8000/api/tasks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            
        }

        const data = await response.json();
        return data as Task[];
    }
    catch (error) {
        console.error('Ошибка при получении задач:', error);
        return undefined;
    }
}