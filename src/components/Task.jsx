import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTasksContext } from "../hooks";
import { calculateTime, initialSecondsTime, intervalHandler, speechAlert, updateTaskInStorage } from "../utils";
import { Alert, TaskButtons } from './'


export const Task = ({
  title, initialHours, initialMinutes, initialSeconds, taskId,
  hours: hoursLS, minutes: minutesLS, seconds: secondsLS, activeTimer
}) => {

  const [hours, setHours] = useState(hoursLS !== initialHours ? hoursLS : initialHours);
  const [minutes, setMinutes] = useState(minutesLS !== initialMinutes ? minutesLS : initialMinutes);
  const [seconds, setSeconds] = useState(secondsLS !== initialSeconds ? secondsLS : initialSeconds);

  const [isActiveTimer, setIsActiveTimer] = useState(activeTimer);
  const [alertActive, setAlertActive] = useState(false);

  const [secondsTime, setSecondsTime] = useState({
    present: Math.floor((Date.now() / 1000)),
    sec: initialSecondsTime(null, hoursLS, minutesLS, secondsLS)
  });

  const [counterFinished, setCounterFinished] = useState(
    () => !initialSecondsTime(null, hoursLS, minutesLS, secondsLS) ? true : false);

  const { deleteTask, editTask, speechAlertOn, creatingTask, tasks } = useTasksContext();

  // UPDATE TOTAL SECONDS
  let timer;
  useEffect(() => {
    if (isActiveTimer) {
      timer = setInterval(() => {
        intervalHandler(setSecondsTime, setIsActiveTimer, setCounterFinished, setAlertActive, speechAlertOn, speechAlert);
        updateTaskInStorage(tasks, speechAlertOn, {
          taskId,
          hours,
          minutes,
          seconds,
          initialHours,
          initialMinutes,
          initialSeconds,
          activeTimer: false,
          title
        });
      }, 1000)
    } else {
      updateTaskInStorage(tasks, speechAlertOn, {
        taskId,
        hours,
        minutes,
        seconds,
        initialHours,
        initialMinutes,
        initialSeconds,
        activeTimer: false,
        title
      });
    }
    return () => clearInterval(timer);
  }, [isActiveTimer])

  // TOTAL SECONDS TO NORMAL TIME
  useEffect(() => {
    if (isActiveTimer) {
      const { hour, minute, second } = calculateTime(secondsTime.sec);
      setHours(hour);
      setMinutes(minute);
      setSeconds(second);
      updateTaskInStorage(tasks, speechAlertOn, {
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
    }
  }, [secondsTime.sec, isActiveTimer, creatingTask, alertActive]);

  // START, PAUSE, CONTINUE BUTTON
  const onTimerClick = () => {
    if (isActiveTimer) {
      setIsActiveTimer(false);
      setSecondsTime({ ...secondsTime, present: 0 })
    } else {
      setIsActiveTimer(true);
      setSecondsTime({ ...secondsTime, present: 0 })
    }
    updateTaskInStorage(tasks, speechAlertOn, {
      taskId,
      hours,
      minutes,
      seconds,
      initialHours,
      initialMinutes,
      initialSeconds,
      activeTimer: !isActiveTimer,
      title
    });
  };

  // RESET BUTTON
  const onResetTime = () => {
    setIsActiveTimer(false);
    setCounterFinished(false);
    setHours(initialHours);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    updateTaskInStorage(tasks, speechAlertOn, {
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
    setSecondsTime({ present: 0, sec: initialSecondsTime({ initialHours, initialMinutes, initialSeconds }) });
  };

  const onTaskDelete = () => deleteTask(taskId);

  const onEdit = () => {
    setIsActiveTimer(false);
    editTask({ taskId, title, hours, minutes, seconds });
  };

  return (
    <>
      {alertActive && <Alert setAlertActive={setAlertActive} title={title} />}
      <div className={`flex flex-col border rounded p-2 items-center relative ${(hours <= 0 && minutes <= 0 && seconds <= 0) && 'bg-green-900/90'}`}>

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
          {`${hours < 10
            ? '0' + hours : hours}:${minutes < 0
              ? '00' : minutes < 10 ? '0' + minutes : minutes}:${seconds < 0
                ? '00' : seconds < 10 ? '0' + seconds : seconds}`}
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
