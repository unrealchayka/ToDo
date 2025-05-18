'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchTasks } from '../components/api/tasks'

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'], // Уникальный ключ для кеширования
    queryFn: fetchTasks, // Функция для получения данных
  })
}