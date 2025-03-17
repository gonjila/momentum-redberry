"use server";

import { revalidateTag } from "next/cache";

import { apiConfig } from "@/configs";
import { TaskType } from "@/types";

const TASKS_TAG = "tasks";

export const getAllTasks = async () => {
  try {
    return apiConfig({ url: "/tasks", tags: [TASKS_TAG] }) as Promise<TaskType[]>;
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};

export const createNewTask = async (data: object) => {
  try {
    const res = apiConfig({ url: "/tasks", method: "POST", body: data, tags: [TASKS_TAG] });

    revalidateTag(TASKS_TAG);

    return res;
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};

export const retrieveTaskById = async (taskId: number | string) => {
  try {
    return apiConfig({ url: `/tasks/${taskId}`, tags: [TASKS_TAG] }) as Promise<TaskType>;
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};

export const changeStatusForTask = async (taskId: number | string, statusId: number) => {
  try {
    return apiConfig({ url: `/tasks${taskId}`, method: "PUT", body: { statusId }, tags: [TASKS_TAG] });
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};
