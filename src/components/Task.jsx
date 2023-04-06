import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTasksContext } from "../hooks";
import { calculateTime, initialSecondsTime, intervalHandler, updateTaskInStorage } from "../utils";
import { Alert, TaskButtons } from './'


export const Task = ({
  title, initialHours, initialMinutes, initialSeconds, taskId,
  hours: hoursLS, minutes: minutesLS, seconds: secondsLS, activeTimer
}) => {

  const { deleteTask, editTask, speechAlertOn, creatingTask } = useTasksContext();

  const [hours, setHours] = useState(hoursLS !== initialHours ? hoursLS : initialHours);
  const [minutes, setMinutes] = useState(minutesLS !== initialMinutes ? minutesLS : initialMinutes);
  const [seconds, setSeconds] = useState(secondsLS !== initialSeconds ? secondsLS : initialSeconds);

  const [isActiveTimer, setIsActiveTimer] = useState(activeTimer);
  const [alertActive, setAlertActive] = useState(false);

  // total seconds
  const [secondsTime, setSecondsTime] = useState({
    present: Math.floor((Date.now() / 1000)),
    sec: initialSecondsTime(null, hoursLS, minutesLS, secondsLS)
  });

  // as time passes we update total seconds and update local storage
  let timer;
  useEffect(() => {
    if (isActiveTimer) {
      timer = setInterval(() => {
        intervalHandler(setSecondsTime, setIsActiveTimer, setAlertActive, speechAlertOn);
        updateTaskInStorage(speechAlertOn, {
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
      updateTaskInStorage(speechAlertOn, {
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

  // Convert total seconds to hours, minutes and seconds, and update local storage.
  useEffect(() => {
    if (isActiveTimer) {
      const { hour, minute, second } = calculateTime(secondsTime.sec);
      setHours(hour);
      setMinutes(minute);
      setSeconds(second);
      updateTaskInStorage(speechAlertOn, {
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

  // on start/pause/resume button click
  const onTimerClick = () => {
    // update states
    if (isActiveTimer) {
      setIsActiveTimer(false);
      setSecondsTime({ ...secondsTime, present: 0 })
    } else {
      setIsActiveTimer(true);
      setSecondsTime({ ...secondsTime, present: 0 })
    }

    // update local storage
    updateTaskInStorage(speechAlertOn, {
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

  // on reset button click
  const onResetTime = () => {
    // update states
    setIsActiveTimer(false);
    setHours(initialHours);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);

    // update local storage
    updateTaskInStorage(speechAlertOn, {
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

  // on delete click
  const onTaskDelete = () => deleteTask(taskId);

  // on edit click
  const onEdit = () => {
    setIsActiveTimer(false);
    editTask({ taskId, title, hours, minutes, seconds });
  };

  return (
    <>
      {/* display alert when time is finished */}
      {alertActive && <Alert setAlertActive={setAlertActive} title={title} />}

      <div className={`bg-stone-900 flex flex-col border rounded p-2 items-center relative ${(hours <= 0 && minutes <= 0 && seconds <= 0) && 'bg-green-900/90'}`}>
        <div className='flex justify-between w-full'>

          {/* edit icon */}
          <span onClick={onEdit} className='text-green-500 cursor-pointer text-xs hover:text-green-300 transition-all'>
            <EditIcon />
          </span>

          {/* delete icon */}
          <span onClick={onTaskDelete} className='text-red-500 cursor-pointer text-xs hover:text-red-300 transition-all'>
            <DeleteIcon />
          </span>
        </div>

        {/* task title */}
        <span className='text-lime-400 font-medium text-center text-lg mt-2.5 capitalize'>
          {title}
        </span>

        {/* timer */}
        <span className='text-white mb-4 mt-2 text-center text-2xl'>
          {`${hours < 10
            ? '0' + hours : hours}:${minutes < 0
              ? '00' : minutes < 10 ? '0' + minutes : minutes}:${seconds < 0
                ? '00' : seconds < 10 ? '0' + seconds : seconds}`}
        </span>

        {/* buttons */}
        <TaskButtons utils={{
          onResetTime, onTimerClick, isActiveTimer, hours,
          initialHours, minutes, initialMinutes, seconds, initialSeconds
        }} />
      </div>
    </>
  )
}
