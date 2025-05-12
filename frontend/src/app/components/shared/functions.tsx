import { CategoryFilterResult, DateFilterResult, Task, TaskCategory } from "./types";

function filterTasksByDate(tasks: TaskCategory[]): DateFilterResult {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    const result = {
        today: [] as Task[],
        nextWeek: [] as Task[],
        nextMonth: [] as Task[],
        later: [] as Task[],
        letter: [] as Task[] // Для задач старше месяца
    };

    tasks.forEach(category => {
        category.tasks.forEach(task => {
            const taskDate = new Date(task.executionDay);
            taskDate.setHours(0, 0, 0, 0);

            if (taskDate.toDateString() === today.toDateString()) {
                result.today.push(task);
            } else if (taskDate > today && taskDate <= nextWeek) {
                result.nextWeek.push(task);
            } else if (taskDate > nextWeek && taskDate <= nextMonth) {
                result.nextMonth.push(task);
            } else if (taskDate > nextMonth) {
                result.later.push(task);
            } else {
                result.letter.push(task); // Просроченные задачи (>1 месяца)
            }
        });
    });

    return result;
}


function groupTasksTitle(tasks: TaskCategory[]): CategoryFilterResult {
    const result: Record<string, Task[]> = {};

    tasks.forEach(category => {
        result[category.title] = category.tasks;
    });

    return result;
}

function filterTasksByCompletion(tasks: TaskCategory[], completed: boolean): Task[] {
    const result: Task[] = [];

    tasks.forEach(category => {
        category.tasks.forEach(task => {
            if (task.finished === completed) {
                result.push(task);
            }
        });
    });

    return result;
}

export {filterTasksByDate, groupTasksTitle, filterTasksByCompletion}