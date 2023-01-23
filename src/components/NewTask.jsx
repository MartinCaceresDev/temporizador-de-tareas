import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';
import { useTasksContext } from "../hooks/useTasksContext"


export const NewTask = () => {

  const [title, setTitle] = useState('');
  const [initialHours, setInitialHours] = useState('');
  const [initialMinutes, setInitialMinutes] = useState('');
  const titleRef = useRef();

  const { toggleCreatingTask, addNewTask } = useTasksContext();

  const validateHours = (e) => {
    if (isNaN(e.target.value)) return;
    if (e.target.value.length) {
      const hoursTyped = Number(e.target.value) >= 0 ? Number(e.target.value) : '';
      setInitialHours(hoursTyped);
    } else {
      setInitialHours('');
    }
  };

  const validateMinutes = (e) => {
    if (isNaN(e.target.value)) return;
    if (e.target.value.length && Number(e.target.value) <= 59 && Number(e.target.value) >= 0) {
      setInitialMinutes(Number(e.target.value))
    } else {
      setInitialMinutes('');
    }
  };

  const onSaveNewTask = () => {
    if (title && (initialHours || initialMinutes)) {
      const newTask = {
        title,
        initialHours: initialHours || 0,
        initialMinutes: initialMinutes || 0,
        initialSeconds: 0,
        hours: initialHours,
        minutes: initialMinutes,
        seconds: 0,
        taskId: uuid(),
        activeTimer: false
      };
      addNewTask(newTask);
    }
  };

  useEffect(() => {
    titleRef.current.focus();
  }, [])

  return (
    <div className='flex justify-center items-center h-full w-full absolute z-10 bg-black/50'>
      <article className='flex flex-col w-min border rounded-lg p-12 items-center bg-black flex-auto max-w-full sm:max-w-min fixed top-1/4 lg:top-0 lg:relative'>
        <span
          className='text-xs absolute top-2.5 right-2.5 text-red-500 cursor-pointer hover:text-red-300'
          onClick={toggleCreatingTask}
        >
          <CloseIcon />
        </span>
        <h2
          className=' mb-6 text-xl text-yellow-300 font-semibold flex-auto text-center'
        >
          Ingrese Nueva Tarea
        </h2>

        {/* Titulo de la tarea */}
        <input
          ref={titleRef}
          type='text'
          placeholder='Nombre de la tarea'
          className='text-blue-900 font-medium text-lg mb-6 px-2 py-1'
          onChange={e => setTitle(e.target.value)}
          value={title}
          autoComplete='off'
        />

        {/* Reloj */}
        <div className='flex'>

          {/* Horas */}
          <div className='flex flex-col items-center w-1/2'>
            <label
              htmlFor='horas'
              className='text-yellow-300 text-sm'
            >
              Horas
            </label>
            <input
              className='mb-4 mt-2 text-center text-2xl w-16'
              type='text'
              id='horas'
              placeholder='00'
              value={initialHours}
              onChange={validateHours}
              autoComplete='off'
            />
          </div>

          {/* Minutos */}
          <div className='flex flex-col items-center w-1/2'>
            <label
              htmlFor='minutos'
              className='text-yellow-300 text-sm'
            >
              Minutos
            </label>
            <input
              className='mb-4 mt-2 text-center text-2xl w-16'
              type='text'
              id='minutos'
              placeholder='00'
              value={initialMinutes}
              onChange={validateMinutes}
              autoComplete='off'
            />
          </div>
        </div>

        {/* Botones */}
        <div className='flex gap-x-1 mt-4'>
          <button
            className='select-none cursor-pointer rounded-lg border-black border py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white font-medium transition-all'
            onClick={toggleCreatingTask}
          >
            Cancelar
          </button>
          <button
            className='select-none cursor-pointer rounded-lg border-black border py-2 px-4 bg-blue-600 hover:bg-blue-800 text-white font-medium transition-all'
            onClick={onSaveNewTask}
          >
            Guardar
          </button>
        </div>
      </article>
    </div>
  )
}
