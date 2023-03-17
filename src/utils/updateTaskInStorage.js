import { handleLocalStorage } from "./";

export const updateTaskInStorage = (tasks, speechAlertOn, task) => {
  // const taskCopy = tasks.concat();
  const {tasks: taskCopy} = handleLocalStorage();
  console.log('taskCopy', taskCopy)
  let tempTasks = []
  taskCopy.forEach(taskItem => {
    if (taskItem.taskId === task.taskId) {
      taskItem = { ...task };
    }
    tempTasks.push(taskItem)
  })
  handleLocalStorage({ tasks: tempTasks, speechAlertOn });
};
