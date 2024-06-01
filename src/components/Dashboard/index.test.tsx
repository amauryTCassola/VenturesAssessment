import * as tasksProvider from "@/contexts/Tasks";
import { Operation } from "@/enums/operation";
import { TaskStatus } from "@/enums/taskStatus";
import Task from "@/interfaces/task";
import Dashboard from ".";
import { act, render, screen } from '@testing-library/react';

const taskList: Task[] = [
    {
        id: 'id123',
        right: 123,
        left: 123,
        operation: Operation.addition,
        result: 246,
        status: TaskStatus.correct
    },

    {
        id: 'id000',
        right: 123,
        left: 123,
        operation: Operation.subtraction,
        result: 5,
        status: TaskStatus.error
    },

    {
        id: 'id222',
        right: 5,
        left: 100,
        operation: Operation.division,
        status: TaskStatus.pending,
    },
];

describe('Dashboard', () => {
      it('should show task list', async () => {

        jest.spyOn(tasksProvider, 'useTasks').mockReturnValue({tasks: taskList});

        render(<Dashboard />);

        expect(screen.queryByText('id123')).not.toBeNull();
        expect(screen.queryByText('id000')).not.toBeNull();
        expect(screen.queryByText('id222')).not.toBeNull();

      });
});