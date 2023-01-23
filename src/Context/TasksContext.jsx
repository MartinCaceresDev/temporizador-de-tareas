import { createContext, useEffect, useReducer } from 'react';
import { taskReducer, actions, initialState, handleLocalStorage } from '../utils';


export const TasksContext = createContext();

export const TasksContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(taskReducer, initialState);

  const updateFromLocalStorage = () => {
    const storage = handleLocalStorage();
    dispatch({ type: actions.updateFromLocalStorage, payload: storage })
  };

  const toggleCreatingTask = () => {
    updateFromLocalStorage();
    handleLocalStorage({ tasks: state.tasks, speechAlertOn: state.speechAlertOn })
    dispatch({ type: actions.toggleCreatingTask });
  };

  const updateTaskInStorage = (task) => {
    const taskCopy = state.tasks.concat();
    let tempTasks = []
    taskCopy.forEach(taskItem => {
      if (taskItem.taskId === task.taskId) {
        taskItem = { ...task };
      }
      tempTasks.push(taskItem)
    })
    handleLocalStorage({ tasks: tempTasks, speechAlertOn: state.speechAlertOn });
  };

  const addNewTask = (newTask) => {
    handleLocalStorage({ tasks: state.tasks.concat(newTask), speechAlertOn: state.speechAlertOn  });
    dispatch({ type: actions.addNewTask, payload: newTask });
  };

  const editTask = (data) => {
    updateFromLocalStorage();
    handleLocalStorage({ tasks: state.tasks, speechAlertOn: state.speechAlertOn })
    dispatch({ type: actions.editingTask, payload: data })
  };

  const updateTask = (updatedTask) => {
    const tasksCopy = state.tasks.concat();
    let tempTasks = [];
    tasksCopy.forEach(task => {
      if (task.taskId === updatedTask.taskId) {
        task = { ...updatedTask }
      }
      tempTasks.push(task);
    });
    handleLocalStorage({tasks: tempTasks, speechAlertOn: state.speechAlertOn  });
    dispatch({ type: actions.updateTask, payload: tempTasks });
  };

  const deleteTask = (taskId) => {
    const tasksForDelete = state.tasks.filter((task) => task.taskId !== taskId);
    handleLocalStorage({ tasks: tasksForDelete, speechAlertOn: state.speechAlertOn  });
    dispatch({ type: actions.deleteTask, payload: tasksForDelete });
  };

  const toggleSpeechAlert = () => {
    updateFromLocalStorage();
    handleLocalStorage({ tasks: state.tasks, speechAlertOn: !state.speechAlertOn });
    dispatch({ type: actions.toggleSpeechAlarm });
  };

  // GETTING DATA FROM LOCAL STORAGE
  useEffect(() => {
    updateFromLocalStorage();
  }, [])


  return (
    <TasksContext.Provider value={{
      updateTaskInStorage,
      toggleCreatingTask,
      addNewTask,
      editTask,
      updateTask,
      deleteTask,
      toggleSpeechAlert,
      updateFromLocalStorage,
      ...state
    }}>
      <div className='relative'>
        {children}
      </div>
    </TasksContext.Provider>
  )
}
