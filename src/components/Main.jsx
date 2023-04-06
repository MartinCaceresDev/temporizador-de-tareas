import { useTasksContext } from "../hooks/useTasksContext"
import { Menu, TasksContainer, TasksContainerDragAndDrop } from "./"

export const Main = () => {

  const { tasks } = useTasksContext();

  return (
    <main className={`bg-stone-300 rounded p-3 sm:p-5 flex flex-col w-full md:w-4/5 ${tasks?.length > 12 && 'lg:w-full'}`}>
      <Menu />
      {/* <TasksContainer /> */}
      <TasksContainerDragAndDrop />
    </main>
  )
}
