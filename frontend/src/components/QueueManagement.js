import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
} from "@mui/material";
import { Queue } from "@mui/icons-material";

const QueueManagement = () => {
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

  // Remove tokens from all counters every 10 sec
  useEffect(() => {
    const timer = setInterval(() => {
      setCounters((prevCounters) =>
        prevCounters.map((counterTokens) =>
          counterTokens.length > 0 ? counterTokens.slice(1) : counterTokens // Remove the first token from all counters
        )
      );
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const handleIssueToken = () => {
    let newToken = tokenCount;

    setCounters((prevCounters) => {
      let updatedCounters = [...prevCounters];

      // Step 1: Fill Counter 1 first if it has space (≤ 14 tokens)
      if (updatedCounters[0].length < 15) {
        updatedCounters[0] = [...updatedCounters[0], newToken];
      } else {
        // Step 2: Find the first available counter with space
        let targetCounterIndex = updatedCounters.findIndex((counter) => counter.length < 15);

        // If all current counters are full, create a new counter
        if (targetCounterIndex === -1) {
          updatedCounters.push([]);
          targetCounterIndex = updatedCounters.length - 1;
        }

        // Assign token to the chosen counter
        updatedCounters[targetCounterIndex] = [...updatedCounters[targetCounterIndex], newToken];
      }

      return updatedCounters;
    });

    setTokenCount((prev) => prev + 1);
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
      <Typography variant="h3" gutterBottom align="center" color="primary">
        Queue Management System
      </Typography>

      <Grid container spacing={4}>
        {/* Active Counters Section */}
        <Grid item xs={12} sm={4}>
          <Card
            variant="outlined"
            style={{
              padding: "20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                style={{ marginBottom: "20px", color: "#3f51b5" }}
                align="center"
              >
                Active Counters
              </Typography>
              <List>
                {counters.map((counterTokens, index) => (
                  <ListItem key={index} style={{ borderBottom: "1px solid #ddd" }}>
                    <ListItemText
                      primary={`Counter ${index + 1}`}
                      secondary={`${counterTokens.length} tokens`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Queue and Token Issuance Section */}
        <Grid item xs={12} sm={8}>
          <Card
            variant="outlined"
            style={{
              padding: "20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom align="center" color="primary">
                Current Queue Length
              </Typography>
              <Typography
                variant="h6"
                align="center"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                {tokenCount - 1} customers in the queue
              </Typography>

              <Button
                variant="contained"
                color="primary"
                startIcon={<Queue />}
                style={{
                  marginBottom: "30px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                }}
                onClick={handleIssueToken}
              >
                Issue Token
              </Button>

              <Divider style={{ margin: "20px 0", borderColor: "#ddd" }} />

              <Typography variant="h6" style={{ marginBottom: "10px", fontWeight: "bold" }}>
                Tokens at Counters
              </Typography>
              {counters.map((counterTokens, index) => (
                <div key={index}>
                  <Typography
                    variant="body1"
                    style={{ marginBottom: "10px", fontWeight: "bold" }}
                  >
                    <strong>Counter {index + 1}:</strong>
                  </Typography>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {counterTokens.map((token) => (
                      <Chip
                        key={token}
                        label={`Token ${token}`}
                        color="success"
                        style={{
                          backgroundColor: "rgba(76, 175, 80, 0.3)",
                          color: "#4CAF50",
                          fontWeight: "bold",
                          borderRadius: "5px",
                          padding: "8px 16px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default QueueManagement;
