import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IChartData, IChartParams, ICoin, TCoinId } from "../../models/coins.model"

export const coinsApi = createApi({
	reducerPath: 'coins/api',
	tagTypes: ['Charts'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.coingecko.com/api/v3/'
	}),
	refetchOnFocus: true,
	endpoints: build => ({
		getCoins: build.query<ICoin[], any>({
			query: () => ({
				url: `coins/markets?vs_currency=usd&x_cg_demo_api_key=CG-s4rjL4zDeTFenF8jvWh4vXHV`,
			}),
		}),
		getCoin: build.query<ICoin, TCoinId>({
			query: (id: string) => ({
				url: `/coins/${id}/`,
			}),
		}),
		getChartData: build.query<IChartData, IChartParams>({
			query: (ChartParams: IChartParams) => ({
				url: `/coins/${ChartParams.id}/market_chart`,
				params: {
					vs_currency: 'usd',
					days: ChartParams.days,
					interval: 'daily',
				},
				providesTags: (result: []) => result
					? [
						...result.map(({ id }) => ({ type: 'Charts' as const, id })),
						{ type: 'Charts', id: 'LIST' },
					]
					: [{ type: 'Charts', id: 'LIST' }],
			}),
		}),
	})
})

export const { useGetCoinsQuery, useGetCoinQuery, useGetChartDataQuery } = coinsApi