import { apiConfig } from "@/config";

export const getAllStatuses = async () => {
  try {
    const res = await apiConfig({ url: "/statuses" });

    return res;
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};
