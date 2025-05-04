import { TaskCategory } from "./types";

export const ACTIVE_COLORS = {
    orange: '#fca311',
    green: '#70e000',
    purple: '#7b2cbf',
    blue: '#56cfe1'
};

export const ToDoTasks: TaskCategory[] = [
    {
      id: 'work-1',
      title: '🖥️ Work Tasks',
      icon: '💼',
      tasks: [
        {
          id: 'work-1',
          title: 'Доделать страницу блога на сайте',
          dateTimeCreated: '2025-02-01T09:00:00',
          executionDay: '2025-02-04',
          timeToComplete: '7 hours',
          priority: 'high',
          finished: false,
          notes: 'Нужно добавить раздел комментариев'
        },
        {
          id: 'work-2',
          title: 'Создать базу данных для блога',
          dateTimeCreated: '2025-02-01T10:30:00',
          executionDay: '2025-02-04',
          timeToComplete: '5 hours',
          priority: 'medium',
          finished: false
        }
      ]
    },
    {
      id: 'study-1',
      title: '📖 Study Goals',
      icon: '🎓',
      tasks: [
        {
          id: 'study-1',
          title: 'Выучить ООП Python',
          dateTimeCreated: '2025-02-01T18:00:00',
          executionDay: '2025-02-04',
          timeToComplete: '12 hours',
          priority: 'high',
          finished: false,
          notes: 'Посмотреть курс на Stepik'
        },
        {
          id: 'study-2',
          title: 'Разобраться с декораторами',
          dateTimeCreated: '2025-02-01T19:00:00',
          executionDay: '2025-02-05',
          timeToComplete: '2 hours',
          priority: 'medium',
          finished: false
        }
      ]
    },
    {
      id: 'travel-1',
      title: '🛫 Travel Plans',
      icon: '✈️',
      tasks: [
        {
          id: 'travel-1',
          title: 'Забронировать отель в Барселоне',
          dateTimeCreated: '2025-01-15T12:00:00',
          executionDay: '2025-03-10',
          timeToComplete: '1 hour',
          priority: 'high',
          finished: true,
          notes: 'Проверить отзывы на Booking'
        },
        {
          id: 'travel-2',
          title: 'Купить билеты на самолет',
          dateTimeCreated: '2025-01-10T14:00:00',
          executionDay: '2025-03-01',
          timeToComplete: '30 mins',
          priority: 'high',
          finished: false
        }
      ]
    },
    {
      id: 'daily-1',
      title: '🎯 Daily To-Dos',
      icon: '✅',
      tasks: [
        {
          id: 'daily-1',
          title: 'Записаться к стоматологу',
          dateTimeCreated: '2025-02-02T08:00:00',
          executionDay: '2025-02-05',
          timeToComplete: '15 mins',
          priority: 'medium',
          finished: false
        },
        {
          id: 'daily-2',
          title: 'Купить продукты на неделю',
          dateTimeCreated: '2025-02-02T09:00:00',
          executionDay: '2025-02-03',
          timeToComplete: '1 hour',
          priority: 'low',
          finished: false,
          notes: 'Молоко, хлеб, фрукты'
        }
      ]
    },
    {
      id: 'life-1',
      title: '🍀 Life Errands',
      icon: '🏠',
      tasks: [
        {
          id: 'life-1',
          title: 'Отнести вещи в химчистку',
          dateTimeCreated: '2025-02-01T16:00:00',
          executionDay: '2025-02-06',
          timeToComplete: '45 mins',
          priority: 'medium',
          finished: false
        },
        {
          id: 'life-2',
          title: 'Забрать посылку с почты',
          dateTimeCreated: '2025-02-01T17:00:00',
          executionDay: '2025-02-03',
          timeToComplete: '30 mins',
          priority: 'high',
          finished: false,
          notes: 'Код получения: 3456'
        }
      ]
    },
    {
      id: 'health-1',
      title: '💪 Health & Fitness',
      icon: '🏋️',
      tasks: [
        {
          id: 'health-1',
          title: 'Тренировка в зале',
          dateTimeCreated: '2025-02-01T07:00:00',
          executionDay: '2025-02-03',
          timeToComplete: '1.5 hours',
          priority: 'high',
          finished: false,
          notes: 'Сфокусироваться на ногах'
        },
        {
          id: 'health-2',
          title: 'Приготовить протеиновые коктейли',
          dateTimeCreated: '2025-02-01T20:00:00',
          executionDay: '2025-02-02',
          timeToComplete: '20 mins',
          priority: 'medium',
          finished: false
        }
      ]
    },
    {
      id: 'creative-1',
      title: '🎨 Creative Projects',
      icon: '🖌️',
      tasks: [
        {
          id: 'creative-1',
          title: 'Набросать эскиз для новой картины',
          dateTimeCreated: '2025-01-28T15:00:00',
          executionDay: '2025-02-07',
          timeToComplete: '2 hours',
          priority: 'low',
          finished: false,
          notes: 'Вдохновение: морской пейзаж'
        },
        {
          id: 'creative-2',
          title: 'Записать гитарный рифф',
          dateTimeCreated: '2025-02-01T21:00:00',
          executionDay: '2025-02-05',
          timeToComplete: '1 hour',
          priority: 'medium',
          finished: false
        }
      ]
    }
  ];