// Типы для данных
type TodoTask = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    due_date?: string;
    priority: 'low' | 'medium' | 'high';
    category?: number;
    tags?: number[];
};

type TaskParams = {
    completed?: boolean;
    priority?: 'low' | 'medium' | 'high';
    category?: number;
    search?: string;
    ordering?: string;
    [key: string]: string | number | boolean | undefined;
};

type Category = {
    id: number;
    name: string;
    color: string;
    icon?: string;
};

type Tag = {
    id: number;
    name: string;
};

type ApiError = {
    message: string;
    status?: number;
    details?: any;
};

// Базовый URL API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Общая функция для обработки запросов
async function fetchApi<T>(
    endpoint: string,
    options?: RequestInit,
    params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
    try {
        let url = `${API_BASE_URL}${endpoint}`;

        // Обрабатываем параметры запроса
        if (params) {
            const searchParams = new URLSearchParams();

            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    searchParams.append(key, String(value));
                }
            });

            if (Array.from(searchParams.keys()).length > 0) {
                url += `?${searchParams.toString()}`;
            }
        }

        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw {
                message: errorData.message || 'Request failed',
                status: response.status,
                details: errorData,
            } as ApiError;
        }

        return (await response.json()) as T;
    } catch (error) {
        console.error('API request failed:', error);
        throw error as ApiError;
    }
}

// Обновленные функции для работы с задачами
export const todoApi = {
    getTasks: async (params?: TaskParams): Promise<TodoTask[]> => {
        return fetchApi<TodoTask[]>('/tasks/', { method: 'GET' }, params);
    },


    // Создать новую задачу
    createTask: async (taskData: Omit<TodoTask, 'id'>): Promise<TodoTask> => {
        return fetchApi<TodoTask>('/tasks/', {
            method: 'POST',
            body: JSON.stringify(taskData),
        });
    },

    // Обновить задачу
    updateTask: async (id: number, taskData: Partial<TodoTask>): Promise<TodoTask> => {
        return fetchApi<TodoTask>(`/tasks/${id}/`, {
            method: 'PATCH',
            body: JSON.stringify(taskData),
        });
    },

    // Удалить задачу
    deleteTask: async (id: number): Promise<void> => {
        await fetchApi(`/tasks/${id}/`, { method: 'DELETE' });
    },

    // Отметить задачу как выполненную
    completeTask: async (id: number): Promise<TodoTask> => {
        return fetchApi<TodoTask>(`/tasks/${id}/complete/`, {
            method: 'POST',
        });
    },
};

// Функции для работы с категориями
export const categoryApi = {
    getCategories: async (): Promise<Category[]> => {
        return fetchApi<Category[]>('/categories/');
    },

    createCategory: async (categoryData: Omit<Category, 'id'>): Promise<Category> => {
        return fetchApi<Category>('/categories/', {
            method: 'POST',
            body: JSON.stringify(categoryData),
        });
    },
};

// Функции для работы с тегами
export const tagApi = {
    getTags: async (): Promise<Tag[]> => {
        return fetchApi<Tag[]>('/tags/');
    },
};

// Функции аутентификации
export const authApi = {
    login: async (credentials: { username: string; password: string }): Promise<{ token: string }> => {
        return fetchApi<{ token: string }>('/auth/login/', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    logout: async (): Promise<void> => {
        await fetchApi('/auth/logout/', { method: 'POST' });
    },

    getCurrentUser: async (): Promise<{ username: string; email: string }> => {
        return fetchApi<{ username: string; email: string }>('/auth/user/');
    },
};