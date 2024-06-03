import { Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/homepage/Homepage'
import Coinpage from './pages/coinpage/Coinpage'
import Navbar from './components/Navbar/Navbar'
import AboutPage from './pages/about/AboutPage'

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/react-crypto-statistics/' element={<Homepage />} />
				<Route path='/react-crypto-statistics/:id' element={<Coinpage />} />
				<Route path='/react-crypto-statistics/about' element={<AboutPage/>} />
			</Routes>
		</>
	)
}

export default App
