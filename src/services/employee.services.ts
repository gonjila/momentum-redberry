import { apiConfig } from "@/config";

export const getAllEmployees = async () => {
  try {
    const res = await apiConfig({ url: "/employees" });

    return res;
  } catch (err) {
    // TODO toast error
    console.error("get all employee service error", (err as Error).message);
  }
};

export const createNewEmpolyee = async (data: object) => {
  try {
    const res = await apiConfig({ url: "/employees", method: "POST", body: data });

    return res;
  } catch (err) {
    // TODO toast error
    console.error("create new employee service error", (err as Error).message);
  }
};
