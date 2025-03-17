import { TasksList, TasksFilter } from "./components";

export default async function Home() {
  return (
    <main className="flex flex-col">
      <h1 className="text-[34px] font-semibold">დავალებების გვერდი</h1>

      <TasksFilter />

      <TasksList />
    </main>
  );
}
