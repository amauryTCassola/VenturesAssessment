import { act, renderHook } from '@testing-library/react';
import * as tasksService from '@/services/Tasks';
import Task from '@/interfaces/task';
import { Operation } from '@/enums/operation';
import { TasksProvider, useTasks } from '.';
import { TaskStatus } from '@/enums/taskStatus';
import { PropsWithChildren } from 'react';

describe('useTasks', () => {

  const task1: Task = {
    id: '123',
    right: 123,
    left: 123,
    operation: Operation.addition
  }

  const task2: Task = {
    id: '000',
    right: 123,
    left: 123,
    operation: Operation.subtraction
  }

  const task3: Task = {
    id: '222',
    right: 5,
    left: 100,
    operation: Operation.division
  }

  jest.useFakeTimers();

  it('should continuosly fetch and submit tasks and update the task list', async () => {
    const task1Done = {...task1, status: TaskStatus.correct, result: 246};
    const task2Done = {...task2, status: TaskStatus.correct, result: 0};
    const task3Error = {...task3, status: TaskStatus.error};
    
    
    const fetchMock = jest.spyOn(tasksService, 'fetchTask')
      .mockResolvedValueOnce(task1).mockResolvedValueOnce(task2).mockResolvedValueOnce(task3);

    const submitMock = jest.spyOn(tasksService, 'submitTask')
      .mockResolvedValueOnce(200).mockResolvedValueOnce(200).mockResolvedValueOnce(400);

    const wrapper = ({ children }: PropsWithChildren) => (
      <TasksProvider>{children}</TasksProvider>
    );
    const { result } = renderHook(() => useTasks(), { wrapper });

    expect(result.current.tasks).toStrictEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(submitMock).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(1001);
    });

    expect(result.current.tasks).toStrictEqual([task1Done]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(submitMock).toHaveBeenCalledTimes(1);
    expect(submitMock).toHaveBeenCalledWith(task1Done.id, task1Done.result);

    await act(async () => {
      jest.advanceTimersByTime(1001);
    });

    expect(result.current.tasks).toStrictEqual([task1Done, task2Done]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(submitMock).toHaveBeenCalledTimes(2);
    expect(submitMock).toHaveBeenCalledWith(task2Done.id, task2Done.result);

    await act(async () => {
      jest.advanceTimersByTime(1001);
    });

    expect(result.current.tasks).toStrictEqual([task1Done, task2Done, task3Error]);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(submitMock).toHaveBeenCalledTimes(3);
    expect(submitMock).toHaveBeenCalledWith(task3Error.id, 20);

  });
  
});
