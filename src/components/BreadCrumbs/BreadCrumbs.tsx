import { Link } from "react-router-dom"
import { TCoinId } from "../../models/coins.model"
import s from './BreadCrumbs.module.scss'

interface IBreadCrumbs {
	name: TCoinId
}

const BreadCrumbs: React.FC<IBreadCrumbs> = ({name}) => {
  return (
	<span className={s.breadcrumbs}>
		<Link to='/react-crypto-statistics/'>Главная</Link>
		<span> / {name}</span>
	</span>
  )
}

export default BreadCrumbs