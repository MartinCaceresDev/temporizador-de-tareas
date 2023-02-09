export const initialSecondsTime = (value, hoursLS, minutesLS, secondsLS) => {
    if (value) {
      return (value.initialHours * 3600) + (value.initialMinutes * 60) + value.initialSeconds;
    } else{
      return (hoursLS * 3600) + (minutesLS * 60) + secondsLS;
    }
  }
