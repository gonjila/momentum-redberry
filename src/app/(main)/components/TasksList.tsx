"use client";

import { StatusType, TaskType } from "@/types";
import { useFiltersStore } from "@/stores";

import TasksListTitle from "./TasksListTitle";
import TasksListItem from "./TasksListItem";

interface IProps {
  tasks?: TaskType[];
  statuses?: StatusType[];
}

function TasksList({ tasks, statuses }: IProps) {
  const { selectedFilters } = useFiltersStore();

  if (!tasks || !statuses) return <p>There are no tasks</p>;

  // Extract active filters from selectedFilters
  const activeFilters = {
    departments: selectedFilters.departments.map(dep => dep.id),
    priorities: selectedFilters.priorities.map(priority => priority.id),
    employees: selectedFilters.employees.map(emp => emp.id),
  };

  // Filter tasks based on selected filters
  const filteredTasks = tasks.filter(task => {
    const matchesDepartment =
      activeFilters.departments.length === 0 || activeFilters.departments.includes(task.department.id);
    const matchesPriority =
      activeFilters.priorities.length === 0 || activeFilters.priorities.includes(task.priority.id);
    const matchesEmployee =
      activeFilters.employees.length === 0 ||
      activeFilters.employees.some(id => task.employee.id === id);

    return matchesDepartment && matchesPriority && matchesEmployee;
  });

  // Group tasks by status
  const groupedTasks = filteredTasks.reduce(
    (acc, task) => {
      const key = task.status.name;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(task);
      return acc;
    },
    {} as Record<string, TaskType[]>,
  );

  const groupedTasksKeys = statuses.map(status => status.name);

  return (
    <div className="grid grid-cols-4 gap-x-[52px]">
      {groupedTasksKeys.map((groupedTasksKey, index) => {
        const colors = ["#F7BC30", "#FB5607", "#FF006E", "#3A86FF"];

        return (
          <div key={groupedTasksKey} className="flex flex-col gap-[30px]">
            <TasksListTitle color={colors[index]} title={groupedTasksKey} />

            {groupedTasks?.[groupedTasksKey]?.map(task => (
              <TasksListItem key={task.id + task.name} color={colors[index]} {...task} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default TasksList;
