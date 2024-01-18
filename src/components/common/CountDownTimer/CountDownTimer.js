import React, { useState, useEffect } from 'react'

function CountDownTimer(props) {
    const {
        initialDays = 12,
        initialHour = 5,
        initialMinute = 10,
        initialSeconds = 20,
        handleTimeOut,
      } = props;
      const [days, setDays] = useState(initialDays);
      const [hours, setHours] = useState(initialHour);
      const [minutes, setMinutes] = useState(initialMinute);
      const [seconds, setSeconds] = useState(initialSeconds);
    
      useEffect(() => {
        let myInterval = setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          }
          if (seconds === 0) {
            if (minutes === 0) {
              // handleTimeOut(true);
              // clearInterval(myInterval);
              setHours(24);
              if (hours === 0) {
                // handleTimeOut(true);
                setDays(days - 1);
                // clearInterval(myInterval);
              } else {
                setHours(hours - 1);
                // setMinutes(minutes - 1);
                setSeconds(59);
                setMinutes(59);
              }
            } else {
              setMinutes(minutes - 1);
              setSeconds(59);
            }
          }
        }, 1000);
        return () => {
          clearInterval(myInterval);
        };
      });

  return (
    <>
    <div className='countdown_timer text-center'>
            {hours === 0 && minutes === 0 && seconds === 0 ? null : (
            <p className="mb-0">
                {" "}
                <span className="day">{days < 10 ? `0${days}` : days}</span>:
                <span className="hour">{hours < 10 ? `0${hours}` : hours}</span>:
                <span className="min">
                {minutes < 10 ? `0${minutes}` : minutes}
                </span>
                :
                <span className="sec">
                {seconds < 10 ? `0${seconds}` : seconds}
                </span>
            </p>
            )}
        </div>
    </>
  )
}

export default CountDownTimer