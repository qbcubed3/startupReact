import React, { useState, useEffect, useRef } from 'react';
import { Chart, LinearScale, BarController, CategoryScale, BarElement } from 'chart.js'; // Import Chart.js with auto registration

export function Stats() {
    Chart.register(LinearScale);
    Chart.register(BarController);
    Chart.register(CategoryScale);
    Chart.register(BarElement);
  const [ratios, setRatios] = useState([]);
  const [labels, setLabels] = useState([]);
  var chartRef = useRef(null);

  useEffect(() => {
    async function getData(){
        await getRatios();
        await getLabels();
        console.log("raiots" + ratios);
        console.log(ratios);
        console.log("labels" + labels);
    }
    getData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
        const chart = chartRef.current.getContext('2d');
        let newChart = chartRef.current.chart;
  
        if (newChart) {
          newChart.destroy();
        }
    newChart = new Chart(chart, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
            label:'Average Happiness for Activity', 
            data: ratios,
            borderWidth: 1
            }]
        },
        options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: false
            }
          }
        }
      })
      chartRef.current.chart = newChart;
    }
    }, [labels, ratios]);

  async function getRatios() {
    const body = {
      authToken: localStorage.getItem('auth')
    };
    const response = await fetch('/api/stats/get', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    const items = data.scores;
    console.log(items);
    setRatios(items);
  }

  async function getLabels() {
    const body = {
      authToken: localStorage.getItem('auth')
    };
    const response = await fetch('/api/survey/get', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    const questions = data.items;
    console.log(questions);
    setLabels(questions);
  }

  return (
    <div className="stats">
      <h2>Statistics</h2>
      <canvas id="barGraph" width="600" height="400" ref={chartRef}></canvas>
    </div>
  );
}

export default Stats;