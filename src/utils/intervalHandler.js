export const intervalHandler = (
  setSecondsTime, setIsActiveTimer, setCounterFinished, setAlertActive, speechAlertOn, speechAlert
)=>{
  setSecondsTime(prev => {
    if (prev.sec > 0) {
      const presentTime = Math.floor((Date.now() / 1000));
      const difference = presentTime - (prev.present === 0 ? presentTime : prev.present);
      return { sec: prev.sec - difference, present: presentTime };
    } else if (prev.sec <= 0) {
      setIsActiveTimer(false)
      setCounterFinished(true);
      setAlertActive(true)
      speechAlertOn && speechAlert(true);

      

      return { ...prev, sec: 0 };
    }
  })
};