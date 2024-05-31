'use client'
import Dashboard from "@/components/Dashboard";
import { TasksProvider } from "@/contexts/Tasks";

export default function Home() {
  return (
    <main className="w-full p-24 text-center flex flex-col gap-4">
      <span className=" text-2xl font-semibold">Ventures Assessment Dashboard</span>
      <TasksProvider>
        <Dashboard/>
      </TasksProvider>
    </main>
  );
}
