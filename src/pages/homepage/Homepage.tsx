import HomeTable from "../../components/HomeTable/HomeTable"

const Homepage = () => {

	return (
		<>
			<div className="container mx-auto">
				<div className="mb-[1em] mt-[4em] flex justify-between items-center">
					<h2>Все монеты: </h2>
					<span className="opacity-[0.3]">Нажмите на название для просмотра статистики</span>
				</div>
				<HomeTable/>
			</div>
		</>
	)
}

export default Homepage