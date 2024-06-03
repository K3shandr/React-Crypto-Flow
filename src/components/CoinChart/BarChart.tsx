import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
	},
	scales: {
		x: {
		  ticks: {
			maxTicksLimit: 30, // Ограничение количества меток по оси X
		  },
		},
	  },
};

interface Props {
	finalData: any[][]
}

const BarChart: React.FC<Props> = ({ finalData }) => {

	const chartData = {
		labels: finalData.map(el => el[0]),
		datasets: [
			{
				label: 'Гистограмма',
				data: finalData.map(el => el[1]),
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',

				  ],
				  borderColor: [
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)',
				  ],
			},
		],
	};
	return <Bar options={options} data={chartData}/>;
}

export default BarChart
