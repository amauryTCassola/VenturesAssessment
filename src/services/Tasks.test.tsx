import { fetchTask, submitTask } from './Tasks';
import Task from '@/interfaces/task';
import { Operation } from '@/enums/operation';

describe('TasksService', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call the api to fetch tasks', async () => {
    const task: Task = {
      id: '123',
      right: 123,
      left: 123,
      operation: Operation.addition
    }
    
    const fetchMock = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(task),
      })
    );
    global.fetch = fetchMock;

    const result = await fetchTask();

    expect(result).toBe(task);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8010/proxy/api/v1/get-task');
  });

  it('should call the api to submit tasks', async () => {
    const task: Task = {
      id: '123',
      right: 123,
      left: 123,
      operation: Operation.addition
    }
    
    const fetchMock = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200
      })
    );
    global.fetch = fetchMock;

    const result = await submitTask(task.id, 246);

    expect(result).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8010/proxy/api/v1/submit-task', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id: '123', result: 246}),
    });
  });
  
});
