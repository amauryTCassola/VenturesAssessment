import { Operation } from '@/enums/operation';
import { TaskStatus } from '@/enums/taskStatus';
import Task from '@/interfaces/task';
import { fetchTask, submitTask } from '@/services/Tasks';
import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface TasksProviderInterface {
  tasks: Task[];
}

const TasksProviderContext = createContext<TasksProviderInterface>({
  tasks: [],
});
TasksProviderContext.displayName = 'TasksProviderContext';

export const TasksProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getResult = (left: number, right: number, operation: Operation) => {
    switch(operation){
      case Operation.addition:
        return left + right;
      case Operation.division:
        return left/right;
      case Operation.multiplication:
        return left*right;
      case Operation.remainder:
        return left%right;
      case Operation.subtraction:
        return left-right;
    }
  }

  const performTask = useCallback(async (task: Task) => {
    task.status = TaskStatus.solving;
    const result = getResult(task.left, task.right, task.operation);
    const status = await submitTask(task.id, result);
    if(status == 200){
      task.result = result;
      task.status = TaskStatus.correct;
    } else {
      task.status = TaskStatus.error;
    }

    let taskList = tasks;
    taskList = taskList.filter((item) => item.id !== task.id);
    setTasks(taskList.concat(task));

  }, [tasks]);

  const getTask = async () => {
    fetchTask()
      .then((data: Task) => {
        let newTask = data;
        newTask.status = TaskStatus.pending;
        setTasks((previous) => previous.concat(newTask))
      })
  }

  useEffect(() => {
    const interval = setInterval(() => getTask(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const index = tasks.findIndex((item) => item.status === TaskStatus.pending);
    if(index != -1){
      performTask(tasks[index]);
    }
  }, [tasks, performTask]);

  return (
    <TasksProviderContext.Provider
      value={{
        tasks
      }}>
      {children}
    </TasksProviderContext.Provider>
  );
};

export function useTasks(): TasksProviderInterface {
  return useContext(TasksProviderContext);
}