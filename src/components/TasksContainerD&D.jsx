import { useTasksContext } from "../hooks/useTasksContext"
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { Task, StrictModeDroppable as Droppable } from '.'

export const TasksContainerDragAndDrop = () => {

  const { tasks, reorderTasks } = useTasksContext();

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const todos = [...tasks];
    const [reorderedItem] = todos.splice(source.index, 1);
    todos.splice(destination.index, 0, reorderedItem)
    if (source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }
    reorderTasks(todos);
  };

  console.log('screen.width', screen.width)

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>

      <Droppable droppableId='frameworks' direction={screen.width > 639 && 'horizontal'}>
        {(droppableProvided) => (
          <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} className={`grid gap-x-2 gap-y-1 bg-stone-900 p-3 grid-cols-[repeat(auto-fit,_minmax(200px,_240px))] justify-self-stretch justify-center min-h-[10rem] items-center`}>

            {tasks?.length > 0
              ? tasks.map((task, index) => (
                <Draggable draggableId={task.taskId.toString()} index={index} key={task.taskId.toString()}>
                  {(draggableProvided) => (
                    <div ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
                      <Task {...task} />
                    </div>
                  )}
                </Draggable>
              ))
              : <span className='text-lime-400 text-center text-xl'>There are no tasks</span>
            }
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext >
  )
}
