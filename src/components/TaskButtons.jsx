
export const TaskButtons = ({ utils }) => {

  const {
    onResetTime,
    onTimerClick,
    counterFinished,
    isActiveTimer,
    hours,
    initialHours,
    minutes,
    initialMinutes,
    seconds,
    initialSeconds } = utils;

  return (
    <div className='flex gap-x-1 w-full sm:w-4/5'>
      <button
        className='select-none cursor-pointer rounded-lg border-black border border-opacity-50 py-2 w-full hover:bg-gray-700 bg-gray-500 transition-all text-white font-medium'
        onClick={onResetTime}
      >
        Resetear
      </button>
      <button
        className={`cursor-pointer disabled:cursor-none rounded-lg border-black select-none border border-opacity-50 py-2 w-full hover:bg-blue-800 bg-blue-600 disabled:bg-blue-600 transition-all text-white font-medium`}
        onClick={onTimerClick}
        disabled={hours <= 0 && minutes <= 0 && seconds <= 0}
      >
        {isActiveTimer
          ? 'Pausar'
          : hours === initialHours && minutes === initialMinutes && seconds === initialSeconds
            ? 'Empezar'
            : 'Continuar'
        }
      </button>
    </div>
  )
}
