import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTasksContext } from '../Context/TasksContext';
import { moveTask } from '../utils';


export const TaskOrder = ({ taskId }) => {
  const { dispatch } = useTasksContext();

  if (screen.width > 639) {
    return (
      <>
        <span onClick={() => moveTask(taskId, 'left', dispatch)} className='absolute hidden group-hover:inline cursor-pointer left-1 top-1/2 -translate-y-1/2 transition-all'>
          <ArrowBackIosIcon sx={{ height: '15px', color: 'white', transition: 'all 200ms', opacity: '0.5', '&:hover': { opacity: 1, height: '20px' } }} />
        </span>
        <span onClick={() => moveTask(taskId, 'right', dispatch)} className='absolute hidden group-hover:inline cursor-pointer right-0 top-1/2 -translate-y-1/2 transition-all'>
          <ArrowForwardIosIcon sx={{ height: '15px', color: 'white', transition: 'all 200ms', opacity: '0.5', '&:hover': { opacity: 1, height: '20px' } }} />
        </span>
      </>
    );
  } else {
    return (
      <div className='absolute right-0 top-1/3 flex flex-col justify-between items-center'>
        <span onClick={() => moveTask(taskId, 'up', dispatch)} className='text-white'>
          <KeyboardArrowUpIcon sx={{ opacity: '0.5' }} />
        </span>
        <span onClick={() => moveTask(taskId, 'down', dispatch)} className='text-white'>
          <KeyboardArrowDownIcon sx={{ opacity: '0.5' }} />
        </span>
      </div>
    );
  }
};