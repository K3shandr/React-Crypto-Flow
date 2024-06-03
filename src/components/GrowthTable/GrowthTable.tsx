import { useAppSelector } from '../../hooks/hooks'

const GrowthTable = () => {
	const {absoluteGrowth, growthTemp} = useAppSelector(state => state.coins)

	return (
		<table className="iksweb">
			<tbody>
				<tr>
					<td className="cursor-pointer" title="Абсолютный прирост – показатель, который характеризует размер увеличения (или уменьшения) уровня ряда за определенный промежуток времени. ">Абсолютный прирост</td>
					<td className="cursor-pointer" title="Темп роста (Тр) — это показатель интенсивности изменения уровня ряда, который выражается в процентах. ">Темп роста</td>
					<td className="cursor-pointer" title='Темп прироста (убыли) - отношение абсолютного прироста или убыли каждого последующего члена ряда к уровню предыдущего, выраженное в процентах. '>Темп прироста</td>
				</tr>
				<tr>
					<td>{absoluteGrowth.toFixed(2)} $</td>
					<td style={growthTemp > 0 ? {color: '#9cc49b'} : {color: '#D62676'}}>{growthTemp} %</td>
					<td style={growthTemp - 100 > 0 ? {color: '#c48074'} : {color: '#D62676'}}>{growthTemp - 100} %</td>
				</tr>
			</tbody>
		</table>
	)
}

export default GrowthTable