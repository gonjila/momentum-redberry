import { redirect } from "next/navigation";

import { DepartmentsBadge, PriorityBadge } from "@/components";
import { retrieveTaskById } from "@/services";

import { CommentsSection, Details } from "./components";

interface IProps {
  params: { taskId: number };
}

async function TaskPage({ params }: IProps) {
  const { taskId } = await params;

  const taskData = await retrieveTaskById(taskId);

  if (!taskData) redirect("/");

  const { priority, department, name, description, ...rest } = taskData;

  return (
    <main className="flex justify-between gap-[220px]">
      <section className="flex flex-1 flex-col gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <PriorityBadge id={priority.id} name={priority.name} icon={priority.icon} size="large" />
              <DepartmentsBadge id={department.id} name={department.name} size="large" />
            </div>

            <h1 className="text-[34px] font-semibold">{name}</h1>
          </div>

          <p className="text-lg">{description}</p>
        </div>

        <Details {...rest} />
      </section>

      <CommentsSection taskId={taskId} />
    </main>
  );
}

export default TaskPage;
