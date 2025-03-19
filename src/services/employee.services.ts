import { apiConfig } from "@/configs";
import { EmployeeType } from "@/types";

export const getAllEmployees = async () => {
  try {
    const res = await apiConfig({ url: "/employees" });

    return res as EmployeeType[];
  } catch (err) {
    // TODO toast error
    console.error("get all employee service error", (err as Error).message);
  }
};

export const createNewEmpolyee = async (data: object) => {
  try {
    const res = await apiConfig({
      url: "/employees",
      method: "POST",
      body: data,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res as EmployeeType;
  } catch (err) {
    // TODO toast error
    console.error("create new employee service error", (err as Error).message);
  }
};
