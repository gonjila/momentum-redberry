import { getAllStatuses, getAllTasks } from "@/services";

import { TasksList, TasksFilter } from "./components";

export default async function Home() {
  const tasks = await getAllTasks();
  const statuses = await getAllStatuses();

  return (
    <main className="flex flex-col">
      <h1 className="text-[34px] font-semibold">დავალებების გვერდი</h1>

      <TasksFilter />

      <TasksList tasks={tasks} statuses={statuses} />
    </main>
  );
}
