import { DepartmentType } from "./department.types";

export type EmployeeType = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: DepartmentType;
};
