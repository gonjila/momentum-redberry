import { apiConfig } from "@/config";

export const getAllEmployees = async () => {
  try {
    const res = await apiConfig({ url: "/employees" });

    return res;
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};

export const createNewEmpolyee = async (data: object) => {
  try {
    const res = await apiConfig({ url: "/employees", method: "POST", body: data });

    return res;
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};
