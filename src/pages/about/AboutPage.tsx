const AboutPage = () => {
	return (
		<>
			<div className="container mx-auto">
				<div className="mb-[1em] mt-[4em] flex justify-between items-center">
					<h2>О разработчиках: </h2>
				</div>
				<div>Приложение было разработано студентами группы ЦИС-37 для курсового проекта на тему "Первичный статистический анализ данных". В разработке приложения принимали участие: </div>
				<div className="flex justify-between mt-4">
					<div className="carddev">
						<img
							className="imground"
							src="https://sun9-41.userapi.com/impg/M3aRzQkO-xd9FkKJ4y4LooLKGDleBpv9QE8Naw/gZ60zeR2HMo.jpg?size=810x1080&quality=96&sign=fc89d017c3026c99a7647829141e595f&type=album"
							alt=""
						/>
						<div>Охлопков Сергей</div>
						<p>Руководитель проекта, программист</p>
					</div>
					<div className="carddev">
						<img
							className="imground"
							src="https://sun9-10.userapi.com/impg/bf1oFmS9YBpQpL_YBnoqY10ovlRIodGSM3Vs0Q/tnri-iwzoAU.jpg?size=1378x1837&quality=95&sign=bed6417a638264d617d641f736748e52&type=album"
							alt=""
						/>
						<div>Калашников Иван</div>
						<p>Документовед, программист</p>
					</div>
					<div className="carddev">
						<img
							className="imground"
							src="https://sun9-27.userapi.com/impg/yt_fXTxWkaa8wPRmbPFKuQ_NWGPwh0rzjE7EVA/tIBtFxfiYVM.jpg?size=1620x2160&quality=95&sign=dc21edd44fa7032402925ff4b315878e&type=album"
							alt=""
						/>
						<div>Артеев Егор</div>
						<p>Документовед, программист</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default AboutPage