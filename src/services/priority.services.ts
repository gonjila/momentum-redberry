import { apiConfig } from "@/config";

export const getAllPriorities = async () => {
  try {
    const res = await apiConfig({ url: "/priorities" });

    return res;
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};
