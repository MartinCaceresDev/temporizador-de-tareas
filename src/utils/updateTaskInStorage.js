import { handleLocalStorage } from "./";

/**
 * 
 * @param {Boolean} speechAlertOn - (Boolean) Indicates if user wants speech alert on.
 * @param {{ taskId: number; hours: number; minutes: number; seconds: number; initialHours: number; initialMinutes: number; initialSeconds: number; activeTimer: boolean; title: string}} task - (Object) The task to update.
 * @returns {Void} (Void) Updates the task in local storage.
 */

export const updateTaskInStorage = (speechAlertOn, task) => {
  const { tasks: taskCopy } = handleLocalStorage();
  let tempTasks = []
  taskCopy.forEach(taskItem => {
    if (taskItem.taskId === task.taskId) {
      taskItem = { ...task };
    }
    tempTasks.push(taskItem)
  })
  handleLocalStorage({ tasks: tempTasks, speechAlertOn });
};
