import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICustomer {
  id: string
  name: string
  food: string[]
}

interface AddFoodToCustomerPayload {
  food: string
  id: string
}

interface ICustomerState {
  value: ICustomer[]
}

const initialState: ICustomerState = {
  value: []
}

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<ICustomer>) => {
      state.value.push(action.payload)
    },
    addFoodToCustomer: (state, action: PayloadAction<AddFoodToCustomerPayload>) => {
      state.value.forEach(customer => {
        if (customer.id === action.payload.id) {
          customer.food.push(action.payload.food)
        }
      })
    }
  },
})

export const { addCustomer, addFoodToCustomer } = customerSlice.actions

export default customerSlice.reducer