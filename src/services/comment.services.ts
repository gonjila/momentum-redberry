"use server";

import { revalidateTag } from "next/cache";

import { apiConfig } from "@/configs";
import { CommentType, NewCommentBodyType } from "@/types";

const COMMENTS_TAG = "comments";

export const getTaskComments = async (taskId: number | string) => {
  try {
    const res = await apiConfig({ url: `/tasks/${taskId}/comments`, tags: [COMMENTS_TAG] });

    return res as CommentType[];
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};

export const createNewComment = async (taskId: number | string, data: NewCommentBodyType) => {
  try {
    const res = await apiConfig({
      url: `/tasks/${taskId}/comments`,
      method: "POST",
      body: data,
      tags: [COMMENTS_TAG],
    });

    revalidateTag(COMMENTS_TAG);

    return res as CommentType;
  } catch (err) {
    // TODO toast error
    console.error({ createNewCommentError: err });
  }
};
