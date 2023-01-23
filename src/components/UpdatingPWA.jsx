import { useRegisterSW } from 'virtual:pwa-register/react'

export const UpdatingPWA = () => {

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  });

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <div className='absolute bg-gray-300 top-0 left-0 max-w-full sm:w-max h-min p-8 border-black border rounded-lg'>
        <div className='mb-4'>
          { offlineReady
            ? <span>Esta app funcionará aún sin conexión.</span>
            : <span className='font-semibold'>Hay una nueva versión disponible.</span>
          }
        </div>
        <div className='flex justify-evenly'>
          { needRefresh 
            && <button 
                  onClick={() => updateServiceWorker(true)}
                  className='select-none cursor-pointer border bg-blue-700 hover:bg-blue-900 text-white font-semibold rounded-full py-1.5 px-3.5'
                >
                  Actualizar
                </button> }
          <button 
            onClick={() => close()}
            className='select-none border text-white rounded-full cursor-pointer bg-gray-500 hover:bg-gray-700 font-semibold py-1.5 px-3.5 transition-all'
          >
            Cerrar
          </button>
        </div>
    </div>
  )
}
