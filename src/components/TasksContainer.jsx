import { v4 as uuid } from 'uuid';
import { useTasksContext } from "../hooks/useTasksContext"
import { Task } from './'

export const TasksContainer = () => {

  const { tasks } = useTasksContext();

  return (
    <div className={`grid gap-x-2 gap-y-1 bg-stone-900 p-3 grid-cols-[repeat(auto-fit,_minmax(200px,_240px))] justify-self-stretch justify-center min-h-[10rem] items-center`}>
      {tasks?.length > 0
        ? tasks.map(task => <Task {...task} key={uuid()} />)
        : <span className='text-lime-400 text-center text-xl'>There are no tasks</span>
      }
    </div>
  )
}
