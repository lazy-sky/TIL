import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addFoodToCustomer } from '../features/customerSlice'

interface ICustomerCard {
  customer: {
    id: string
    name: string
    food: string[]
  }
}

export default function CustomerCard({ customer } : ICustomerCard) {
  const [customerFoodInput, setCustomerFoodInput] = useState('')
  const dispatch = useDispatch()

  const handleInputChange = (e: { target: { value: string } }) => {
    setCustomerFoodInput(e.target.value)
  }

  const handleAddBtnClick = () => {
    dispatch(addFoodToCustomer({
      id: customer.id,
      food: customerFoodInput
    }))
    setCustomerFoodInput('')
  }

  return (
    <div className="customer-food-card-container">
      <h5>{customer.name}</h5>
      <div className="customer-foods-container">
        <div className="customer-food">
          {customer.food.map(food => (
            <p>{food}</p>
          ))}
        </div>
        <div className="customer-food-input-container">
          <input value={customerFoodInput} onChange={handleInputChange}/>
          <button onClick={handleAddBtnClick}>Add</button>
        </div>
      </div>
    </div>
  )
}
