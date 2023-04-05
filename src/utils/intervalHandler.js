/**
 * 
 * @param {Function} setSecondsTime 
 * @param {Function} setIsActiveTimer 
 * @param {Function} setAlertActive 
 * @param {Boolean} speechAlertOn 
 * @param {Function} speechAlert 
 * @returns {Void} (Void) Updates secondsTime state.
 */

import { speechAlert } from "./";

export const intervalHandler = (
  setSecondsTime, setIsActiveTimer, setAlertActive, speechAlertOn
)=>{
  setSecondsTime(prev => {
    if (prev.sec > 0) {
      const presentTime = Math.floor((Date.now() / 1000));
      const difference = presentTime - (prev.present === 0 ? presentTime : prev.present);
      return { sec: prev.sec - difference, present: presentTime };
    } else if (prev.sec <= 0) {
      setIsActiveTimer(false)
      setAlertActive(true)
      speechAlertOn && speechAlert(true);
      return { ...prev, sec: 0 };
    }
  })
};