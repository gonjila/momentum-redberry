import { apiConfig } from "@/config";
import { CommentType } from "@/types";

export const getTaskComments = async (taskId: number | string) => {
  try {
    const res = await apiConfig({ url: `/tasks/${taskId}/comments` });

    return res as CommentType[];
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

    return res as CommentType;
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};
