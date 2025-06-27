import React, { useState } from "react";
import QueueManagement from "./QueueManagement"; // Make sure the import path is correct

const App = () => {
  const [tokenCount, setTokenCount] = useState(1); // Start from token 1
  const [counters, setCounters] = useState([[]]); // Start with one counter

  // Issue token function
  const handleIssueToken = () => {
    let newToken = tokenCount; // Current token count

    setCounters((prevCounters) => {
      let updatedCounters = [...prevCounters];
      let lastCounterIndex = updatedCounters.length - 1;

      // If the last counter has 15 tokens, create a new counter
      if (updatedCounters[lastCounterIndex].length >= 15) {
        updatedCounters.push([]);
        lastCounterIndex += 1;
      }

      // Add the token to the last counter
      updatedCounters[lastCounterIndex] = [
        ...updatedCounters[lastCounterIndex],
        newToken,
      ];

      return updatedCounters;
    });

    // Increment token count after assigning
    setTokenCount((prev) => prev + 1);
  };

  return (
    <QueueManagement
      tokenCount={tokenCount}
      counters={counters}
      handleIssueToken={handleIssueToken}
    />
  );
};

export default App;
