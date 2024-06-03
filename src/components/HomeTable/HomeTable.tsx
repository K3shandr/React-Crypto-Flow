import s from './HomeTable.module.scss';
import { useGetCoinsQuery } from "../../store/coins/coins.api"
import { Link } from 'react-router-dom';
import { Audio } from 'react-loader-spinner'

const HomeTable = () => {

	const { data, isSuccess, isFetching, isError } = useGetCoinsQuery({
		refetchOnFocus: true,
	})

	console.log(data)

	let coins = isSuccess ? data.filter(coin => coin.current_price > 10 && coin.current_price < 1000) : []

	return (
		<>
			<div className={s["mobile-table"]}>
				<table className={s.iksweb}>
					<thead>
						<tr>
							<th style={{ textAlign: 'left' }}>Монета</th>
							<th>Стоимость в $</th>
							<th>Изменение за 24 ч.</th>
							<th>В обороте за 24 ч.</th>
							<th>Рыночная кап-ция</th>
						</tr>
					</thead>
					<tbody>
						{isSuccess &&
							coins.map((coin, index) => (
								<tr key={coin.id} className={index % 2 === 0 ? s.second : s.first}>
									<td>
										<Link to={coin.id + '/'}>
											<div className={s["coin-title"]}>
												<img src={coin.image} alt={coin.name} />
												<h3>{coin.name}</h3>
												<p>{coin.symbol}</p>
											</div>
										</Link>
									</td>
									<td>{coin.current_price} $</td>

									<td className={coin.price_change_percentage_24h> 0 ? s.up : s.low}>
										{coin.price_change_percentage_24h.toFixed(2)}% {coin.price_change_percentage_24h > 0 ? "⏶" : "⏷"}
									</td>
									<td>{coin.total_volume.toLocaleString('ru')} $</td>
									<td>{coin.market_cap.toLocaleString('ru')} $</td>
								</tr>
							))
						}

					</tbody>
				</table>

			</div>
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
			{isError && <div className='w-[50%] mt-[2em] mx-auto text-center opacity-50'>Возникла ошибка. Сервис, предоставиляющий API заблокировал доступ к данным. Ожидайте в течении 5-10 минут до возобновления доступа.</div>}
		</>
	)
}

export default HomeTable
