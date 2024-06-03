
import { TCoinId } from "../models/coins.model"
import { useGetChartDataQuery } from "../store/coins/coins.api"
import { useActions } from "./hooks"

const useStatistics = (id: TCoinId, days:number) => {
	const { data: chartData, isSuccess: isChartSuccess } = useGetChartDataQuery({ id, days: days + '', })

	let dataArray = isChartSuccess ? chartData.prices.map(item => item[1]) : []
	
	const { calculateStatistics } = useActions()

	calculateStatistics(dataArray.map(el => Math.round(el)))
	
}

export default useStatistics