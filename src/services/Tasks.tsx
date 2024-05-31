import Task from "@/interfaces/task";

const baseProxyUrl = 'http://localhost:8010/proxy';

export const fetchTask = async (): Promise<Task> => {
    const res = await fetch(baseProxyUrl+'/api/v1/get-task');
    return res.json();
}

export const submitTask = async (id: string, result: number): Promise<number> => {
    const res = await fetch(baseProxyUrl+'/api/v1/submit-task', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id, result}),
      });

    return res.status;
}