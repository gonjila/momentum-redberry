import { apiConfig } from "@/configs";
import { DepartmentType } from "@/types";

export const getAllDepartments = async () => {
  try {
    const res = await apiConfig({ url: "/departments" });

    return res as DepartmentType[];
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};
