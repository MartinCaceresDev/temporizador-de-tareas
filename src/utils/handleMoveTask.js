import { actions } from "./actions";
import { handleLocalStorage } from "./handleLocalStorage";

  export const moveTask = (taskId, direction, dispatch) => {
    const { tasks, speechAlertOn } = handleLocalStorage();
    const taskIndex = tasks.findIndex(task => task.taskId === taskId);

    // if moving first to left or last to right ignore
    if (taskIndex === 0 && direction === 'left') return;
    if (taskIndex === tasks.length - 1 && direction === 'right') return;

    const taskToReorder = { ...tasks.find(task => task.taskId === taskId) };
    const tempTasks = tasks.filter(task => task.taskId !== taskId);

    // Reorder in tempTasks
    if (direction === 'left' || direction === 'up') {
      tempTasks.splice(taskIndex - 1, 0, taskToReorder);
    } else if (direction === 'right' || direction === 'down') {
      tempTasks.splice(taskIndex + 1, 0, taskToReorder);
    }

    // Update in state and localStorage
    dispatch({ type: actions.reorderTask, payload: tempTasks });
    handleLocalStorage({ tasks: tempTasks, speechAlertOn });
  };
