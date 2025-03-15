import { apiConfig } from "@/config";

export const getAllTasks = async () => {
  try {
    return apiConfig({ url: "/tasks" });
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};

export const createNewTask = async (data: object) => {
  try {
    return apiConfig({ url: "/tasks", method: "POST", body: data });
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};

export const retrieveTaskById = async (taskId: number | string) => {
  try {
    return apiConfig({ url: `/tasks${taskId}` });
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};

export const changeStatusForTask = async (taskId: number | string, statusId: number) => {
  try {
    return apiConfig({ url: `/tasks${taskId}`, method: "PUT", body: { statusId } });
  } catch (err) {
    // TODO toast error
    console.error(err);
  }
};
