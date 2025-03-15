import { apiConfig } from "@/config";

export const getTaskComments = async (taskId: number | string) => {
  try {
    const res = await apiConfig({ url: `/tasks/${taskId}/comments` });

    return res;
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};

export const createNewComment = async (taskId: number | string, data: object) => {
  try {
    const res = await apiConfig({
      url: `/tasks/${taskId}/comments`,
      method: "POST",
      body: data,
    });

    return res;
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};
