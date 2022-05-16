interface IReservationCard {
  name: string
}

export default function ReservationCard({ name }: IReservationCard) {
  return (
    <div className="reservation-card-container">{name}</div>
    
  )
}
