import { createContext, useReducer } from 'react';
import { taskReducer, actions, initialState, handleLocalStorage, updateFromLocalStorage } from '../utils';

// useReducer init function - gets data from local storage
const init = () => {
  const { tasks, speechAlertOn } = handleLocalStorage();
  return { tasks, speechAlertOn }
};

export const TasksContext = createContext();

export const TasksContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(taskReducer, initialState, init);

  const toggleCreatingTask = () => {
    updateFromLocalStorage(dispatch);
    handleLocalStorage({ tasks: state.tasks, speechAlertOn: state.speechAlertOn })
    dispatch({ type: actions.toggleCreatingTask });
  };

  const addNewTask = (newTask) => {
    handleLocalStorage({ tasks: state.tasks.concat(newTask), speechAlertOn: state.speechAlertOn });
    dispatch({ type: actions.addNewTask, payload: newTask });
  };

  const editTask = (data) => {
    updateFromLocalStorage(dispatch);
    dispatch({ type: actions.editingTask, payload: data })
  };

  const updateTask = (task) => {
    const taskCopy = state.tasks.concat();
    let tempTasks = []
    // iterate and update the correct task
    taskCopy.forEach(taskItem => {
      if (taskItem.taskId === task.taskId) {
        taskItem = { ...task };
      }
      tempTasks.push(taskItem)
    });
    dispatch({ type: actions.updateTask, payload: tempTasks });
    handleLocalStorage({ tasks: tempTasks, speechAlertOn: state.speechAlertOn });
  };

  const deleteTask = (taskId) => {
    const tasksForDelete = state.tasks.filter((task) => task.taskId !== taskId);
    handleLocalStorage({ tasks: tasksForDelete, speechAlertOn: state.speechAlertOn });
    dispatch({ type: actions.deleteTask, payload: tasksForDelete });
  };

  const toggleSpeechAlert = () => {
    updateFromLocalStorage(dispatch);
    handleLocalStorage({ tasks: state.tasks, speechAlertOn: !state.speechAlertOn });
    dispatch({ type: actions.toggleSpeechAlarm });
  };

  const moveTask = (taskId, direction) => {

    const taskIndex = state.tasks.findIndex(task => task.taskId === taskId);

    if ((taskIndex === 0 && direction === 'left') || (taskIndex === state.tasks.length - 1 && direction === 'right')) return;

    const taskToReorder = { ...state.tasks.find(task => task.taskId === taskId) };
    const tempTasks = state.tasks.filter(task => task.taskId !== taskId);

    if (direction === 'left') {
      tempTasks.splice(taskIndex - 1, 0, taskToReorder);
    } else if (direction === 'right') {
      tempTasks.splice(taskIndex + 1, 0, taskToReorder);
    }
    dispatch({ type: actions.reorderTask, payload: tempTasks });
    handleLocalStorage({ tasks: tempTasks, speechAlertOn: state.speechAlertOn });
  };

  return (
    <TasksContext.Provider value={
      { toggleCreatingTask, addNewTask, editTask, updateTask, deleteTask, toggleSpeechAlert, moveTask, dispatch, ...state }
    }>
      <div className='relative'>
        {children}
      </div>
    </TasksContext.Provider>
  )
}
