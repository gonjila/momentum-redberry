import { CreateTaskForm } from "./components";

function CreateTaskPage() {
  return (
    <main className="flex flex-col gap-6">
      <h1 className="text-[34px] font-semibold">შექმენი ახალი დავალება</h1>

      <CreateTaskForm />
    </main>
  );
}

export default CreateTaskPage;
