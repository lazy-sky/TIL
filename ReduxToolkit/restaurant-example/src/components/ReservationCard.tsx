import { useDispatch } from 'react-redux'
import { removeReservation } from '../features/reservationSlice'

interface IReservationCard {
  name: string
  index: number
}

export default function ReservationCard({ name, index }: IReservationCard) {
  const dispatch = useDispatch()

  const handleCardClick = () => {
    dispatch(removeReservation(index))
  }

  return (
    <div className="reservation-card-container" onClick={handleCardClick}>{name}</div>
  )
}
