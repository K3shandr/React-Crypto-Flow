import { useParams } from 'react-router-dom'
import { useGetChartDataQuery, useGetCoinQuery } from '../../store/coins/coins.api'
import CoinChart from '../../components/CoinChart/CoinChart'
import { useState } from 'react'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import { useAppSelector } from '../../hooks/hooks'
import { Audio } from 'react-loader-spinner'
import useStatistics from '../../hooks/useStatistics'
import ChartButtons from './../../components/ChartButtons/ChartButtons';
import Statistics from '../../components/Statistics/Statistics'
import { Utils } from '../../utils/coin.utils'

const Coinpage = () => {
	const { id } = useParams()
	const [days, setDays] = useState(100)

	useStatistics(id, days)

	const { mean, variance, median, difference } = useAppSelector(state => state.coins)
	const { data, isSuccess, isFetching } = useGetCoinQuery(id)
	const [showChart, setShowChart] = useState(true)



	// Для Bar
	const { data: barChartData, isSuccess: isBarChartSuccess } = useGetChartDataQuery({ id, days: days + '', })
	let roundedData = isBarChartSuccess ? barChartData.prices.map(item => Math.round(item[1])) : []
	let finalData = Utils.countOccurrences(roundedData)

	let chartFill = showChart ? '#4f8df4' : "rgb(214, 38, 118)"
	let printFill = '#4f8df4'

	return (
		<div className='container mx-auto '>
			{isSuccess && (
				<div className='mt-[4em]'>
					<div className='flex items-start justify-between'>
						<div className='flex'>
							<img className='w-[1.5em] h-[1.5em] mr-4' src={data.image.small} alt='' />
							<h2 className=''>{data.name}</h2>
						</div>
						<button className='flex	'>
							<span title={showChart ? 'Показать графики' : 'Скрыть графики'} className='mr-2 hover:text-gray-500' onClick={() => setShowChart(prev => !prev)}>
								<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
									<path d="M4.5 20.25C4.30189 20.2474 4.11263 20.1676 3.97253 20.0275C3.83244 19.8874 3.75259 19.6981 3.75 19.5V4.5C3.75 4.30109 3.82902 4.11032 3.96967 3.96967C4.11032 3.82902 4.30109 3.75 4.5 3.75C4.69891 3.75 4.88968 3.82902 5.03033 3.96967C5.17098 4.11032 5.25 4.30109 5.25 4.5V19.5C5.24741 19.6981 5.16756 19.8874 5.02747 20.0275C4.88737 20.1676 4.69811 20.2474 4.5 20.25Z" fill={chartFill} />
									<path d="M19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5C3.75 19.3011 3.82902 19.1103 3.96967 18.9697C4.11032 18.829 4.30109 18.75 4.5 18.75H19.5C19.6989 18.75 19.8897 18.829 20.0303 18.9697C20.171 19.1103 20.25 19.3011 20.25 19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25Z" fill={chartFill} />
									<path d="M8 16.75C7.80189 16.7474 7.61263 16.6676 7.47253 16.5275C7.33244 16.3874 7.25259 16.1981 7.25 16V12C7.25 11.8011 7.32902 11.6103 7.46967 11.4697C7.61032 11.329 7.80109 11.25 8 11.25C8.19891 11.25 8.38968 11.329 8.53033 11.4697C8.67098 11.6103 8.75 11.8011 8.75 12V16C8.74741 16.1981 8.66756 16.3874 8.52747 16.5275C8.38737 16.6676 8.19811 16.7474 8 16.75Z" fill={chartFill} />
									<path d="M11.5 16.75C11.3019 16.7474 11.1126 16.6676 10.9725 16.5275C10.8324 16.3874 10.7526 16.1981 10.75 16V8C10.75 7.80109 10.829 7.61032 10.9697 7.46967C11.1103 7.32902 11.3011 7.25 11.5 7.25C11.6989 7.25 11.8897 7.32902 12.0303 7.46967C12.171 7.61032 12.25 7.80109 12.25 8V16C12.2474 16.1981 12.1676 16.3874 12.0275 16.5275C11.8874 16.6676 11.6981 16.7474 11.5 16.75Z" fill={chartFill} />
									<path d="M15 16.75C14.8019 16.7474 14.6126 16.6676 14.4725 16.5275C14.3324 16.3874 14.2526 16.1981 14.25 16V12C14.25 11.8011 14.329 11.6103 14.4697 11.4697C14.6103 11.329 14.8011 11.25 15 11.25C15.1989 11.25 15.3897 11.329 15.5303 11.4697C15.671 11.6103 15.75 11.8011 15.75 12V16C15.7474 16.1981 15.6676 16.3874 15.5275 16.5275C15.3874 16.6676 15.1981 16.7474 15 16.75Z" fill={chartFill} />
									<path d="M18.5 16.75C18.3019 16.7474 18.1126 16.6676 17.9725 16.5275C17.8324 16.3874 17.7526 16.1981 17.75 16V8C17.75 7.80109 17.829 7.61032 17.9697 7.46967C18.1103 7.32902 18.3011 7.25 18.5 7.25C18.6989 7.25 18.8897 7.32902 19.0303 7.46967C19.171 7.61032 19.25 7.80109 19.25 8V16C19.2474 16.1981 19.1676 16.3874 19.0275 16.5275C18.8874 16.6676 18.6981 16.7474 18.5 16.75Z" fill={chartFill} />
								</svg>
							</span>
							<span title='Печать отчета' className='mr-2 hover:text-gray-500' onClick={() => window.print()}>
								<svg className="inline" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
									<path d="M18 13.5H18.5C19.4428 13.5 19.9142 13.5 20.2071 13.2071C20.5 12.9142 20.5 12.4428 20.5 11.5V10.5C20.5 8.61438 20.5 7.67157 19.9142 7.08579C19.3284 6.5 18.3856 6.5 16.5 6.5H7.5C5.61438 6.5 4.67157 6.5 4.08579 7.08579C3.5 7.67157 3.5 8.61438 3.5 10.5V12.5C3.5 12.9714 3.5 13.2071 3.64645 13.3536C3.79289 13.5 4.0286 13.5 4.5 13.5H6" stroke={printFill} />
									<path d="M6.5 19.8063L6.5 11.5C6.5 10.5572 6.5 10.0858 6.79289 9.79289C7.08579 9.5 7.55719 9.5 8.5 9.5L15.5 9.5C16.4428 9.5 16.9142 9.5 17.2071 9.79289C17.5 10.0858 17.5 10.5572 17.5 11.5L17.5 19.8063C17.5 20.1228 17.5 20.2811 17.3962 20.356C17.2924 20.4308 17.1422 20.3807 16.8419 20.2806L14.6738 19.5579C14.5878 19.5293 14.5448 19.5149 14.5005 19.5162C14.4561 19.5175 14.4141 19.5344 14.3299 19.568L12.1857 20.4257C12.094 20.4624 12.0481 20.4807 12 20.4807C11.9519 20.4807 11.906 20.4624 11.8143 20.4257L9.67005 19.568C9.58592 19.5344 9.54385 19.5175 9.49952 19.5162C9.45519 19.5149 9.41221 19.5293 9.32625 19.5579L7.15811 20.2806C6.8578 20.3807 6.70764 20.4308 6.60382 20.356C6.5 20.2811 6.5 20.1228 6.5 19.8063Z" stroke={printFill} />
									<path d="M9.5 13.5L13.5 13.5" stroke={printFill} stroke-linecap="round" />
									<path d="M9.5 16.5L14.5 16.5" stroke={printFill} stroke-linecap="round" />
									<path d="M17.5 6.5V6.1C17.5 4.40294 17.5 3.55442 16.9728 3.02721C16.4456 2.5 15.5971 2.5 13.9 2.5H10.1C8.40294 2.5 7.55442 2.5 7.02721 3.02721C6.5 3.55442 6.5 4.40294 6.5 6.1V6.5" stroke={printFill} />
								</svg>
							</span>
						</button>
					</div>
					<BreadCrumbs name={data?.name} />
					{
						showChart && (
							<>

								<CoinChart id={id} days={days} />
								<ChartButtons onClick={setDays} />
							</>
						)
					}
					<Statistics
						name={data.name}
						current_price={data.market_data.current_price.usd}
						last_updated={data.last_updated}
						mean={mean}
						variance={variance}
						days={days}
						median={median}
						difference={difference}
						showChart={showChart}
						finalData={finalData}
						roundedData={roundedData}
					/>
				</div>
			)}
			{isFetching &&
				<div className='w-[80px] mt-[10em] opacity-5 mx-auto'>
					<Audio
						height="80"
						width="80"
						color="grey"
						ariaLabel="loading"
					/>
				</div>
			}
		</div>
	)
}

export default Coinpage