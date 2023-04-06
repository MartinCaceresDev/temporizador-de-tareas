import { speechAlert } from "../utils";

export const Alert = ({ setAlertActive }) => {

  const handleAlerts = () => {
    setAlertActive(false);
    speechAlert(false, title);
  }

  return (
    <dialog className='rounded-lg max-w-full flex p-8 flex-col bg-red-500 items-center absolute top-0.5 w-max h-min z-20'>
      <span className='text-white text-lg text-center font-medium'>
        Task time is finished:
      </span>
      <span className='text-yellow-200 text-lg text-center font-bold capitalize'>
        {title}
      </span>
      <button
        className='active:bg-orange-500 select-none border border-current rounded-xl py-1.5 mt-6 cursor-pointer hover:bg-red-800 transition-all font-semibold text-white px-4'
        onClick={handleAlerts}
      >
        Accept
      </button>
    </dialog>
  )
}
