import { useRegisterSW } from 'virtual:pwa-register/react'
import { EditTask, Main, NewTask, UpdatingPWA, Alert } from './components'
import { useTasksContext } from './hooks/useTasksContext'
import './index.css'


export default function App() {
  const {
    offlineReady: [offlineReady],
    needRefresh: [needRefresh],
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  });

  const { creatingTask, editingTask } = useTasksContext();

  return (
    <div className='bg-sky-800 w-full h-full flex justify-center items-center relative min-h-screen min-w-full overflow-x-hidden'>
      <Main />
      {creatingTask && <NewTask />}
      {editingTask && <EditTask />}
      {(offlineReady || needRefresh)
        && <UpdatingPWA />
      }
    </div>
  )
}
