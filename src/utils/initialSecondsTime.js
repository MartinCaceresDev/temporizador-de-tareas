/**
 * 
 * @param {{initialHours: number; initialMinutes: number; initialSeconds: number}} value - (optional)
 * @param {Number} hoursLS - (Number) Hours
 * @param {Number} minutesLS - (Number) Minutes
 * @param {Number} secondsLS - (Number) Seconds
 * @returns { Number } (Number) If "value" object is received, returns its data converted to total seconds. If "value" object is not received, returns data from other three arguments converted to total seconds.
 */

export const initialSecondsTime = (value, hoursLS, minutesLS, secondsLS) => {
    if (value) {
      return (value.initialHours * 3600) + (value.initialMinutes * 60) + value.initialSeconds;
    } else{
      return (hoursLS * 3600) + (minutesLS * 60) + secondsLS;
    }
  }
