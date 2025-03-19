import { apiConfig } from "@/configs";
import { PriorityType } from "@/types";

export const getAllPriorities = async () => {
  try {
    const res = await apiConfig({ url: "/priorities" });

    return res as PriorityType[];
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};
