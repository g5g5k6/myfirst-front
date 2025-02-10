import React from "react";
function Clock() {
    const getCurrentTime = () => new Date().toLocaleTimeString();
    const [time, setTime] = React.useState(getCurrentTime());
  
    React.useEffect(() => {
      const interval = setInterval(() => setTime(getCurrentTime()), 1000);
      return () => clearInterval(interval);
    }, []);
  
    return <div>{time}</div>;
  }
  
  export default Clock;
  