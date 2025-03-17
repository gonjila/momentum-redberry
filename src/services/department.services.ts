import { apiConfig } from "@/configs";

export const getAllDepartments = async () => {
  try {
    const res = await apiConfig({ url: "/departments" });

    return res;
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};
