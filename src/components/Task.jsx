import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTasksContext } from "../hooks/useTasksContext";
import { calculateTime, speechAlert } from "../utils";
import { Alert, TaskButtons } from './'


export const Task = ({
  title, initialHours, initialMinutes, initialSeconds,
  hours: hoursLS, minutes: minutesLS, seconds: secondsLS,
  taskId, activeTimer
}) => {

  const initialSecondsTime = (value) => {
    if (value) {
      return (value.initialHours * 3600) + (value.initialMinutes * 60) + value.initialSeconds;
    } else if (!value) {
      return (hoursLS * 3600) + (minutesLS * 60) + secondsLS;
    }
  }

  const [hours, setHours] = useState(hoursLS !== initialHours ? hoursLS : initialHours);
  const [minutes, setMinutes] = useState(minutesLS !== initialMinutes ? minutesLS : initialMinutes);
  const [seconds, setSeconds] = useState(secondsLS !== initialSeconds ? secondsLS : initialSeconds);
  const [isActiveTimer, setIsActiveTimer] = useState(activeTimer);
  const [secondsTime, setSecondsTime] = useState(() => initialSecondsTime());
  const [counterFinished, setCounterFinished] = useState(() => !initialSecondsTime() ? true : false);
  const [alertActive, setAlertActive] = useState(false)

  const { deleteTask, editTask, speechAlertOn, updateTaskInStorage, creatingTask } = useTasksContext();

  // UPDATE SECONDS
  let timer;
  useEffect(() => {
    if (isActiveTimer) {
      timer = setInterval(() => {
        setSecondsTime(prev => {
          if (prev) {
            return prev - 1
          } else {
            setIsActiveTimer(false)
            setCounterFinished(true);
            setAlertActive(true)
            speechAlertOn && speechAlert(true);
            return 0;
          }
        })
      }, 1000)
    }
    return () => clearInterval(timer);
  }, [isActiveTimer])

  const updateTask = () => {
    const { hour, minute, second } = calculateTime(secondsTime);
    setHours(hour);
    setMinutes(minute);
    setSeconds(second);
    updateTaskInStorage({
      taskId,
      hours: hour,
      minutes: minute,
      seconds: second,
      initialHours,
      initialMinutes,
      initialSeconds,
      activeTimer: isActiveTimer,
      title
    });
  };

  // SECONDS TO NORMAL TIME
  useEffect(() => {
    updateTask();
  }, [secondsTime, isActiveTimer, creatingTask]);

  const onTimerClick = () => isActiveTimer ? setIsActiveTimer(false) : setIsActiveTimer(true);

  const onResetTime = () => {
    setIsActiveTimer(false);
    setCounterFinished(false);
    setHours(initialHours);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    updateTaskInStorage({
      taskId,
      hours: initialHours,
      minutes: initialMinutes,
      seconds: initialSeconds,
      initialHours,
      initialMinutes,
      initialSeconds,
      isActiveTimer: false,
      title
    });
    setSecondsTime(() => initialSecondsTime({ initialHours, initialMinutes, initialSeconds }));
  };

  const onTaskDelete = () => deleteTask(taskId);

  const onEdit = () => {
    setIsActiveTimer(false);
    editTask({ taskId, title, hours, minutes, seconds });
  };

  return (
    <>
      {alertActive && <Alert setAlertActive={setAlertActive} title={title} />}
      <div className={`flex flex-col border rounded p-2 items-center relative ${counterFinished && 'bg-green-900/90'}`}>

        <div className='flex justify-between w-full'>
          {/* EDIT */}
          <span
            className='text-green-500 cursor-pointer text-xs hover:text-green-300 transition-all'
            onClick={onEdit}
          >
            <EditIcon />
          </span>

          {/* DELETE */}
          <span
            className='text-red-500 cursor-pointer text-xs hover:text-red-300 transition-all'
            onClick={onTaskDelete}
          >
            <DeleteIcon />
          </span>
        </div>

        {/* TITLE */}
        <span className='text-lime-400 font-medium text-center text-lg mt-2.5 capitalize'>
          {title}
        </span>

        {/* CLOCK */}
        <span
          className='text-white mb-4 mt-2 text-center text-2xl'
        >
          {`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`}
        </span>

        {/* BUTTONS */}
        <TaskButtons utils={{
          onResetTime, onTimerClick, counterFinished, isActiveTimer, hours,
          initialHours, minutes, initialMinutes, seconds, initialSeconds
        }} />
      </div>
    </>
  )
}
