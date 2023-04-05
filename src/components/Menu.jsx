import AddIcon from '@mui/icons-material/Add';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import { useTasksContext } from "../hooks/useTasksContext"

export const Menu = () => {

  const { speechAlertOn, toggleSpeechAlert, toggleCreatingTask } = useTasksContext();

  return (
    <div className={`relative max-h-min flex flex-col md:flex-row md:pb-4 justify-center items-center pb-9 sm:pb-4 gap-x-2`}>

      {/* App name */}
      <span className={`mb-4 md:mb-0 md:absolute md:left-0 md:text-lg font-semibold text-center text-lime-600 italic text-xl`}>
        Tasks Countdown Timer
      </span>

      {/* Add task icon */}
      <span onClick={toggleCreatingTask} className='font-medium text-center cursor-pointer border rounded-full py-1.5 px-3 bg-fuchsia-700 text-white hover:bg-fuchsia-900 hover:shadow-md hover:shadow-slate-400 active:bg-orange-600 transition-all'>
        <AddIcon />
      </span>

      {/* Toggle speech alert */}
      <span onClick={toggleSpeechAlert} className={`cursor-pointer text-base absolute right-4 bottom-2 mt-1 ${speechAlertOn ? 'text-green-600' : 'text-red-600'}`}>
        {speechAlertOn ? <AlarmOnIcon /> : <AlarmOffIcon />}
      </span>
    </div>
  )
}
