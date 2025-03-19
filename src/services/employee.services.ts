"use server";

import { revalidateTag } from "next/cache";

import { apiConfig } from "@/configs";
import { EmployeeType } from "@/types";

const EMPLOYEE_TAG = "employee";

export const getAllEmployees = async () => {
  try {
    const res = await apiConfig({ url: "/employees", tags: [EMPLOYEE_TAG] });

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
      tags: [EMPLOYEE_TAG],
    });

    revalidateTag(EMPLOYEE_TAG);

    return res as EmployeeType;
  } catch (err) {
    // TODO toast error
    console.error("create new employee service error", (err as Error).message);
  }
};
