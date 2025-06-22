// src/pages/Charts.js

import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import './Charts.css'; 

import {
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,   
  LineElement,   
  Title,          
  ArcElement,     
  Tooltip,       
  Legend,         
  Filler          
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Charts = () => {
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Monthly Revenue ($)',
        data: [12000, 15000, 18000, 13000, 20000, 16000, 19000],
        backgroundColor: 'rgba(52, 152, 219, 0.7)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineAreaData = {
    labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7'],
    datasets: [
      {
        label: 'New Sign-ups',
        data: [10, 15, 25, 30, 40, 35, 48],
        fill: true, // This enables the area under the line
        backgroundColor: 'rgba(46, 204, 113, 0.3)',
        borderColor: 'rgba(46, 204, 113, 1)',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const pieData = {
    labels: ['To Do', 'In Progress', 'Done', 'Blocked'],
    datasets: [
      {
        data: [30, 20, 45, 5],
        backgroundColor: [
          'rgba(231, 76, 60, 0.8)',
          'rgba(52, 152, 219, 0.8)',
          'rgba(46, 204, 113, 0.8)',
          'rgba(241, 196, 15, 0.8)',
        ],
        borderColor: [
          'rgba(231, 76, 60, 1)',
          'rgba(52, 152, 219, 1)',
          'rgba(46, 204, 113, 1)',
          'rgba(241, 196, 15, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        font: {
          size: 18
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toLocaleString();
            }
            return label;
          }
        }
      }
    },
    scales: { 
      x: {
        ticks: { color: '#666' },
        grid: { display: false }
      },
      y: {
        ticks: { color: '#666' },
        grid: { color: '#e0e0e0' }
      }
    }
  };

  return (
    <div className="charts-page">
      <h2>Data Visualizations</h2>

      <div className="chart-container-wrapper">
        <div className="chart-section">
          <h3>Monthly Revenue</h3>
          <div className="chart-canvas-wrapper">
            <Bar
              data={barData}
              options={{
                ...commonChartOptions,
                plugins: {
                  ...commonChartOptions.plugins,
                  title: { ...commonChartOptions.plugins.title, text: 'Monthly Revenue Overview' }
                }
              }}
            />
          </div>
        </div>

        <div className="chart-section">
          <h3>New User Sign-ups</h3>
          <div className="chart-canvas-wrapper">
            <Line
              data={lineAreaData}
              options={{
                ...commonChartOptions,
                plugins: {
                  ...commonChartOptions.plugins,
                  title: { ...commonChartOptions.plugins.title, text: 'Weekly New User Growth' }
                }
              }}
            />
          </div>
        </div>

        <div className="chart-section">
          <h3>Task Status Distribution</h3>
          <div className="chart-canvas-wrapper pie-chart-wrapper">
            <Pie
              data={pieData}
              options={{
                ...commonChartOptions,
                scales: {},
                plugins: {
                  ...commonChartOptions.plugins,
                  title: { ...commonChartOptions.plugins.title, text: 'Current Task Distribution' },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1) + '%';
                        return `${label}: ${value} (${percentage})`;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;