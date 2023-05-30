import { createContext, useReducer } from 'react';
import { taskReducer, actions, initialState, handleLocalStorage, updateFromLocalStorage } from '../utils';

// useReducer init function - gets data from local storage
const init = () => {
  const { tasks = [], speechAlertOn = false } = handleLocalStorage();
  return { tasks, speechAlertOn };
};

export const TasksContext = createContext();

export const TasksContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(taskReducer, initialState, init);

  const toggleCreatingTask = () => {
    dispatch({ type: actions.toggleCreatingTask });
    updateFromLocalStorage(dispatch);
  };

  const addNewTask = (newTask) => {
    const { tasks = [], speechAlertOn = false } = handleLocalStorage();
    handleLocalStorage({ tasks: tasks.concat(newTask), speechAlertOn });
    updateFromLocalStorage(dispatch);
    dispatch({ type: actions.toggleCreatingTask });
  };

  const editTask = (data) => {
    updateFromLocalStorage(dispatch);
    dispatch({ type: actions.editingTask, payload: data });
  };

  const updateTask = (task) => {
    const { tasks = [], speechAlertOn = false } = handleLocalStorage();

    let tempTasks = [];

    // iterate and update the correct task
    tasks.forEach(taskItem => {
      if (taskItem.taskId === task.taskId) {
        taskItem = { ...task };
      }
      tempTasks.push(taskItem);
    });

    // Update in state and localStorage
    handleLocalStorage({ tasks: tempTasks, speechAlertOn });
    updateFromLocalStorage(dispatch);
    dispatch({ type: actions.updateTask });
  };

  const deleteTask = (taskId) => {
    const { tasks = [], speechAlertOn = false } = handleLocalStorage();
    const tasksToRemain = tasks.filter((task) => task.taskId !== taskId);
    handleLocalStorage({ tasks: tasksToRemain, speechAlertOn });
    updateFromLocalStorage(dispatch);
  };

  const toggleSpeechAlert = () => {
    updateFromLocalStorage(dispatch);
    handleLocalStorage({ tasks: state.tasks, speechAlertOn: !state.speechAlertOn });
    dispatch({ type: actions.toggleSpeechAlarm });
  };

  const moveTask = (taskId, direction) => {
    const storage = handleLocalStorage();
    const taskIndex = storage.tasks.findIndex(task => task.taskId === taskId);

    // if moving first to left or last to right ignore
    if (taskIndex === 0 && direction === 'left') return;
    if (taskIndex === storage.tasks.length - 1 && direction === 'right') return;

    const taskToReorder = { ...storage.tasks.find(task => task.taskId === taskId) };
    const tempTasks = storage.tasks.filter(task => task.taskId !== taskId);

    // Reorder in tempTasks
    if (direction === 'left' || direction === 'up') {
      tempTasks.splice(taskIndex - 1, 0, taskToReorder);
    } else if (direction === 'right' || direction === 'down') {
      tempTasks.splice(taskIndex + 1, 0, taskToReorder);
    }

    // Update in state and localStorage
    dispatch({ type: actions.reorderTask, payload: tempTasks });
    handleLocalStorage({ tasks: tempTasks, speechAlertOn: state.speechAlertOn });
  };

  return (
    <TasksContext.Provider value={
      { toggleCreatingTask, addNewTask, editTask, updateTask, deleteTask, toggleSpeechAlert, moveTask, dispatch, ...state }
    }>
      {children}
    </TasksContext.Provider>
  );
};
