import { createContext, useContext, useReducer } from 'react';
import { taskReducer, actions, initialState, handleLocalStorage, updateFromLocalStorage } from '../utils';

// useReducer init function - gets data from local storage
const init = () => {
  const { tasks = [], speechAlertOn = false } = handleLocalStorage();
  return { tasks, speechAlertOn };
};

export const TasksContext = createContext();
export const useTasksContext = () => useContext(TasksContext);


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

  return (
    <TasksContext.Provider value={
      { toggleCreatingTask, addNewTask, editTask, updateTask, deleteTask, toggleSpeechAlert, dispatch, ...state }
    }>
      {children}
    </TasksContext.Provider>
  );
};
