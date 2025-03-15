import { TasksFilter, TasksList } from "@/components";

export default function Home() {
  return (
    <main className="flex flex-col gap-13">
      <h1 className="text-[36px] font-semibold">დავალებების გვერდი</h1>

      <TasksFilter />

      <TasksList />
    </main>
  );
}
