import { apiConfig } from "@/configs";
import { StatusType } from "@/types";

export const getAllStatuses = async () => {
  try {
    const res = await apiConfig({ url: "/statuses" });

    return res as StatusType[];
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};
