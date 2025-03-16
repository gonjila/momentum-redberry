import { TasksFilter, TasksList } from "@/components";
import { getAllDepartments, getAllEmployees, getAllPriorities } from "@/services";

export default async function Home() {
  const departments = await getAllDepartments();
  const priorities = await getAllPriorities();
  const employees = await getAllEmployees();

  return (
    <main className="flex flex-col">
      <h1 className="text-[36px] font-semibold">დავალებების გვერდი</h1>

      <TasksFilter departments={departments} priorities={priorities} employees={employees} />

      <TasksList />
    </main>
  );
}
