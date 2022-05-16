import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./App.css";
import { RootState } from './app/store';
import ReservationCard from './components/ReservationCard';
import { addReservation } from './features/reservationSlice';

function App() {
  const [reservationNameInput, setReservationNameInput] = useState('')

  const reservations = useSelector(
    (state: RootState) => state.reservations.value
  )

  const dispatch = useDispatch()

  const handleChangeInput = (e: { currentTarget: { value: string } }) => {
    setReservationNameInput(e.currentTarget.value)
  }

  const handleAddBtnClick = () => {
    if (!reservationNameInput) return

    dispatch(addReservation(reservationNameInput))
    setReservationNameInput('')
  }

  return (
    <div className="App">
      <div className="container">
        <div className="reservation-container">
          <div>
            <h5 className="reservation-header">Reservations</h5>
            <div className="reservation-cards-container">
              {reservations.map((name, index) => (
                <ReservationCard 
                  key={`reservatoin-${index}`} 
                  name={name} 
                  index={index}
                />
              ))}
            </div>
          </div>
          <div className="reservation-input-container">
            <input value={reservationNameInput} onChange={handleChangeInput} />
            <button onClick={handleAddBtnClick}>Add</button>
          </div>
        </div>
        <div className="customer-food-container">
          <div className="customer-food-card-container">
            <p>Selena Gomez</p>
            <div className="customer-foods-container">
              <div className="customer-food"></div>
              <div className="customer-food-input-container">
                <input />
                <button>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
