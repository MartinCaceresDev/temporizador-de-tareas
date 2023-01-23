import { useContext } from 'react'
import { TasksContext } from '../Context/TasksContext';


export const useTasksContext = ()=> useContext(TasksContext);

