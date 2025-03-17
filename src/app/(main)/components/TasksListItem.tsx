import Image from "next/image";
import Link from "next/link";

import { DepartmentsBadge, Icon, PriorityBadge } from "@/components";
import { formatDate } from "@/helpers";
import { TaskType } from "@/types";

interface IProps extends TaskType {
  color: string;
}

function TasksListItem({
  id,
  name,
  description,
  due_date,
  total_comments,
  department,
  employee,
  priority,
  color,
}: IProps) {
  const formatedDate = formatDate(due_date);

  return (
    <Link
      href={`/tasks/${id}`}
      className="flex flex-col gap-7 rounded-2xl border p-5"
      style={{ borderColor: color }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <PriorityBadge size="small" {...priority} />
          <DepartmentsBadge size="small" {...department} />
        </div>

        <p className="text-xs">{formatedDate}</p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm">{description}</p>
      </div>

      <div className="flex items-center justify-between">
        <Image src={employee.avatar} alt={employee.name} width={32} height={32} />

        <div className="flex items-center gap-1">
          <Icon iconName="comment" />
          <span>{total_comments}</span>
        </div>
      </div>
    </Link>
  );
}

export default TasksListItem;
