import { useDispatch } from 'react-redux'
import { addCustomer } from '../features/customerSlice'
// import { removeReservation } from '../features/reservationSlice'

interface IReservationCard {
  name: string
  index: number
}

export default function ReservationCard({ name, index }: IReservationCard) {
  const dispatch = useDispatch()

  const handleCardClick = () => {
    // dispatch(removeReservation(index))
    dispatch(addCustomer({
      id: String(Math.random()),
      name,
      food: []
    }))
  }

  return (
    <div className="reservation-card-container" onClick={handleCardClick}>{name}</div>
  )
}
