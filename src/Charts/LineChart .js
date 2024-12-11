import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = (props) => {
    const data = {
        labels: ['00:00', '06:00', '12:00', '18:00', '24:00'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [20, 40, 60, 50, 30], // فترة صاعدة من 00:00 إلى 12:00 ثم فترة هابطة من 12:00 إلى 24:00
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132)',
            },
            {
                label: 'Dataset 2',
                data: [30, 20, 10, 30, 50], // فترة هابطة من 00:00 إلى 12:00 ثم فترة صاعدة من 12:00 إلى 24:00
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235)',
            },
        ],
    };


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: false,
                text: 'Line Chart',
            },
        },
    };

    return (
            <Line data={data} style={{width:"80%",height:"80%"}} options={options}/>
    )
}

export default LineChart;
