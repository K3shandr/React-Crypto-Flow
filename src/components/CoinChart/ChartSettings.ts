export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
		},
	},
	borderColor: '#4f8df4',
	backgroundColor: '#4f8df430',
	borderWidth: 1,
	elements: {
		point: {
			radius: 0
		}
	},
	scales: {
		x: {
			ticks: {
				maxTicksLimit: 10, // Ограничение количества меток по оси X
			},
		},
	},
};