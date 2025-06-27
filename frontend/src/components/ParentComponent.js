import React, { useState, useEffect } from "react";
import QueueManagement from "./QueueManagement"; // Import your QueueManagement component
import RealTimeMonitoring from "./RealTimeMonitoring"; // Import your RealTimeMonitoring component

const ParentComponent = () => {
  const [tokenCount, setTokenCount] = useState(() => {
    return parseInt(localStorage.getItem("tokenCount")) || 1;
  });

  const [counters, setCounters] = useState(() => {
    return JSON.parse(localStorage.getItem("counters")) || [[]];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tokenCount", tokenCount);
    localStorage.setItem("counters", JSON.stringify(counters));
  }, [tokenCount, counters]);

  return (
    <div>
      <QueueManagement tokenCount={tokenCount} setTokenCount={setTokenCount} counters={counters} setCounters={setCounters} />
      <RealTimeMonitoring currentQueue={tokenCount - 1} />
    </div>
  );
};

export default ParentComponent;
