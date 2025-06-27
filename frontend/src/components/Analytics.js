import React from 'react';
import { Card, CardContent, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement } from 'chart.js';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const Analytics = () => {

  // Bar chart data for service performance
  const servicePerformanceData = {
    labels: ['Mail Services', 'Parcel Services', 'Financial Services'],
    datasets: [
      {
        label: 'Service Time (minutes)',
        data: [8, 12, 15],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Efficiency Score (%)',
        data: [86, 85, 82],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Line chart data for trend over time (example)
  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Service Time Trend (minutes)',
        data: [8, 9, 10, 11, 12],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Pie chart data for customer satisfaction
  const satisfactionData = {
    labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'],
    datasets: [
      {
        data: [50, 30, 10, 10],
        backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 159, 64, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 99, 132, 0.8)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Bar chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Service Performance Comparison',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  // Line chart options
  const lineOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Service Time Trend Over Time',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  // Pie chart options
  const pieOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Customer Satisfaction Breakdown',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h3" gutterBottom>
        Analytics Dashboard
      </Typography>
      <Typography variant="subtitle1" paragraph>
        Comprehensive service performance analysis and insights.
      </Typography>

      <Box display="flex" flexDirection="column" gap={4} mt={4}>
        {/* Adding new graphs side by side */}
        <Box display="flex" gap={4} flexWrap="wrap">
          <Card style={{ flex: 1, minWidth: '300px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Service Time Trend (Line Chart)
              </Typography>
              <Line data={trendData} options={lineOptions} />
            </CardContent>
          </Card>

          <Card style={{ flex: 1, minWidth: '300px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Customer Satisfaction (Pie Chart)
              </Typography>
              <Pie data={satisfactionData} options={pieOptions} />
            </CardContent>
          </Card>
        </Box>

        {/* Service Performance Bar Chart */}
        <Card style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Service Performance Bar Chart
            </Typography>
            <Bar data={servicePerformanceData} options={options} />
          </CardContent>
        </Card>

        <Card style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Detailed Service Metrics
            </Typography>
            <TableContainer component={Paper} style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>SERVICE TYPE</TableCell>
                    <TableCell>AVC, WAIT TIME</TableCell>
                    <TableCell>SERVICE TIME</TableCell>
                    <TableCell>CUSTOMER SATISFACTION</TableCell>
                    <TableCell>EFFICIENCY SCORE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Mail Services</TableCell>
                    <TableCell>5m</TableCell>
                    <TableCell>8m</TableCell>
                    <TableCell>92%</TableCell>
                    <TableCell>86%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Parcel Services</TableCell>
                    <TableCell>8m</TableCell>
                    <TableCell>12m</TableCell>
                    <TableCell>87%</TableCell>
                    <TableCell>85%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Financial Services</TableCell>
                    <TableCell>12m</TableCell>
                    <TableCell>15m</TableCell>
                    <TableCell>85%</TableCell>
                    <TableCell>82%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Analytics;
