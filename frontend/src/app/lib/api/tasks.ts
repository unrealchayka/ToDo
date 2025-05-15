import { Task } from "@/app/components/shared/types"
  
export const fetchTasks = async (): Promise<Task[]> => {
    const token = ''
    const response = await fetch('http://localhost:8000/api/tasks/', {
        method: 'GET',
        credentials: 'include',  // Важно: для передачи кук
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    
    if (!response.ok) {
      throw new Error('Ошибка при загрузке задач')
    }
    console.log(response)
    return response.json()
  }