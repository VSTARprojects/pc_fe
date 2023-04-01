import React from 'react';
import {
    Chart ,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Bar } from 'react-chartjs-2';

const LABELS = ['colon adenocarcinoma', 'colon normal', 'gastric adenocarcinoma', 'gastric normal','kidney Chromophobe carcinoma', 'kidney clear cell carinoma', 'kidney papillary carcinoma']


function BarGraph(){ 
    Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
    return(
  <div>
      <div style={{ maxWidth: "650px", alignItems: 'center'}}>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: LABELS,
            datasets: [
              {
                // Label for bars
                label: "total count/value",
                // Data or value of your each variable
                data: [1552, 1319, 613, 1400, 1200, 1500, 2000],
                // Color of each bar
                backgroundColor: ["orange", "green", "red", "blue", "pink", "maroon", "brown"],
                // Border color of each bar
                borderColor: ["aqua", "green", "red", "yellow"],
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
      </div>
  </div>
    
);
  }


export default BarGraph;