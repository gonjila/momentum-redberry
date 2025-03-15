import { TasksFilter, TasksList } from "@/components";
import { getAllStatuses } from "@/services";

export default async function Home() {
  const statuses = await getAllStatuses();

  console.log({ statuses });

  return (
    <main className="flex flex-col">
      <h1 className="text-[36px] font-semibold">დავალებების გვერდი</h1>

      <TasksFilter />

      <TasksList />
    </main>
  );
}
