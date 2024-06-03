
import { useState } from 'react';
import { useActions, useAppSelector } from '../../hooks/hooks';

interface IChartButtonProps {
	onClick(days: number): void
}

const ChartButtons: React.FC<IChartButtonProps> = ({ onClick }) => {
	const [inputValue, setInputValue] = useState('10')

	const { setForecastValue, isForecast, isTrend } = useActions()
	const { trendStatus, forecastStatus } = useAppSelector(state => state.coins)

	return (
		<div className='mt-2'>
			<div className='flex w-[100%] justify-between items-center'>
				<div>
					<button className='mr-4 text-center' onClick={() => setForecastValue(Number(inputValue))}>Спрогнозировать на:</button>
					<input className='px-4 border-b mr-4 font-blue border-b-slate-100' type="number" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
				</div>
				<div>
					<span onClick={() => isTrend()} className='mr-4 cursor-pointer'>Линия тренда: <span className='font-blue hover:text-gray-500'>{trendStatus ? 'Вкл' : 'Выкл'}</span></span>
					<span onClick={() => isForecast()} className='mr-4 cursor-pointer'>Прогнозирование: <span className='font-blue hover:text-gray-500'>{forecastStatus ? 'Вкл' : 'Выкл'}</span></span>
					<span>
						<span>Период: </span>
						<select onChange={(event) => onClick(Number(event.target.value))} className='hover:text-gray-500 py-1 font-blue'>
							<option value={100}>100 дней</option>
							<option value={182}>Пол года</option>
							<option value={365}>Год</option>
						</select>
					</span>
				</div>
			</div>
		</div>
	)
}

export default ChartButtons
