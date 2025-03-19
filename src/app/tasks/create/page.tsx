import { getAllDepartments, getAllEmployees, getAllPriorities, getAllStatuses } from "@/services";

import { CreateTaskForm } from "./components";

async function CreateTaskPage() {
  const employees = await getAllEmployees();
  const priorities = await getAllPriorities();
  const statuses = await getAllStatuses();
  const departments = await getAllDepartments();

  return (
    <main className="flex flex-col gap-6">
      <h1 className="text-[34px] font-semibold">შექმენი ახალი დავალება</h1>

      <CreateTaskForm
        employees={employees || []}
        priorities={priorities || []}
        statuses={statuses || []}
        departments={departments || []}
      />
    </main>
  );
}

export default CreateTaskPage;
