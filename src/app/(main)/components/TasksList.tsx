import { getAllTasks } from "@/services";

import TasksListTitle from "./TasksListTitle";
import TasksListItem from "./TasksListItem";

async function TasksList() {
  const tasks = await getAllTasks();

  if (!tasks) return <p>there is no tasks</p>;

  const groupedTasks = tasks.reduce(
    (acc, task) => {
      const key = task.status.name;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(task);
      return acc;
    },
    {} as Record<string, typeof tasks>,
  );

  const groupedTasksKeys = Object.keys(groupedTasks);

  Array.from({ length: 2 }).fill(10);

  return (
    <div className="grid grid-cols-4 gap-x-[52px]">
      {groupedTasksKeys.map((groupedTasksKey, index) => {
        const colors = ["#F7BC30", "#FB5607", "#FF006E", "#3A86FF"];

        return (
          <div key={groupedTasksKey} className="flex flex-col gap-[30px]">
            <TasksListTitle color={colors[index]} title={groupedTasksKey} />

            {groupedTasks[groupedTasksKey].map(task => (
              <TasksListItem key={task.id + task.name} color={colors[index]} {...task} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default TasksList;
