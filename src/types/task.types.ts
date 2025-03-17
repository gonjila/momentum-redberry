import { DepartmentType } from "./department.types";
import { EmployeeType } from "./employee.types";
import { PriorityType } from "./priority.types";
import { StatusType } from "./status.types";

export interface TaskType {
  id: number;
  name: string;
  description: string;
  due_date: string;
  department: DepartmentType;
  employee: EmployeeType;
  status: StatusType;
  priority: PriorityType;
  total_comments?: number;
}
