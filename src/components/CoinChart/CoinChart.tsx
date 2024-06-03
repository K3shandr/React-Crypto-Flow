import {Line} from "react-chartjs-2";
import s from './CoinChart.module.scss'
import { options } from './ChartSettings';
import { useGetChartDataQuery } from '../../store/coins/coins.api';
import { ICoinChart } from '../../models/coins.model';

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
import { Utils } from "../../utils/coin.utils";
import { useAppSelector } from "../../hooks/hooks";

ChartJS.register(CategoryScale, LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const CoinChart: React.FC<ICoinChart> = ({ id, days }) => {

	const { forecastValue, forecastStatus, trendStatus } = useAppSelector(store => store.coins)

	const { data, isSuccess } = useGetChartDataQuery({ id, days: days + '', })

	let roundedData = isSuccess ? data.prices.map(item => Math.round(item[1])) : []

	let forecastDateArray = Utils.createForecastDatesArray(forecastValue)

	let forecastArray = [...roundedData.map((el, index) => index !== roundedData.length - 1 ? undefined : el), ...Utils.linearRegressionForecast(roundedData, forecastValue)]

	let chartLabels = isSuccess ? [...Utils.createReverseDateArray(data.prices.map((item, index) => item && index)), ...forecastDateArray] : []

	let chartData = {
		labels: chartLabels,
		datasets: [
			{
				label: `Изменение цены за ${days} дней`,
				data: roundedData,
				
			},
			{
				label: `Линия тренда`,
				data: trendStatus && Utils.calculateTrendLine(roundedData),
				borderColor: '#6DA58440',
				backgroundColor: '#6DA58410',
			},
			{
				label: `Прогнозирование`,
				data: forecastStatus && forecastArray,
				borderColor: '#D62676',
				backgroundColor: '#D6267650',
			},
		],
	}
	return (
		<div>
			<div className={s.chart}>
				<Line data={chartData} options={options} />
			</div>
		</div>
	);
};

export default CoinChart;
