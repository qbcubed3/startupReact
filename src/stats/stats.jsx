import React, {useState, useEffect, useRef} from 'react';
import {Chart} from 'chart.js';

export function Stats(){
    const[ratios, setRatios] = useState();
    const[labels, setLabels] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        getRatios(); getLabels();
      }, []);

      useEffect(() => {
          if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            const newChart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: labels,
                datasets: [
                  {
                    label: 'Average Happiness for Activity',
                    data: ratios,
                    borderWidth: 1
                  }
                ]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });
    
            return () => {
              newChart.destroy(); // Cleanup chart instance on unmount
            };
          }
      }, [labels, ratios]);

    async function getRatios(){
        const body = {
            authToken: localStorage.getItem("auth")
        }
        var response = await fetch('/api/stats/get', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(body)
        })
        const data = await response.json();
        const items = data.scores;
        setRatios(items);
    }

    async function getLabels(){
        const body = {
          authToken: localStorage.getItem("auth")
        }
        var response = await fetch('/api/survey/get', {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(body)
        })
        const data = await response.json();
        const questions = data.items;
        setLabels(questions)
    }
    
    return(
        <div className="stats">
          <h2>Statistics</h2>
          <canvas id="barGraph" width="400" height="200" ref={chartRef}></canvas>
        </div>
    )
}

export default Stats;