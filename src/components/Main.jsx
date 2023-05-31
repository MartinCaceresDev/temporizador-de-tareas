import { useTasksContext } from "../Context/TasksContext";
import { Menu, TasksContainer } from "./";

export const Main = () => {

  const { tasks } = useTasksContext();

  return (
    <main className={`bg-stone-300 rounded p-3 pt-4 sm:p-5 flex flex-col w-full md:w-4/5 ${tasks?.length > 12 && 'lg:w-full'}`}>
      <Menu />
      <TasksContainer />
    </main>
  );
};
