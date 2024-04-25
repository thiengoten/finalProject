/* eslint-disable no-case-declarations */
import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_CART_ITEM,
  UPDATE_QUANTITY,
} from '@/constants'

export const initState = {
  carts: [],
  total: 0,
}

function reducer(state = initState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const itemExists = state.carts.some(
        (cart) => cart.id === action.payload.id,
      )
      let updatedCartsAfterAddition

      if (itemExists) {
        updatedCartsAfterAddition = state.carts.map((cart) =>
          cart.id === action.payload.id
            ? { ...cart, quantity: cart.quantity + 1 }
            : cart,
        )
      } else {
        updatedCartsAfterAddition = [
          ...state.carts,
          { ...action.payload, quantity: 1 },
        ]
      }

      return {
        ...state,
        carts: updatedCartsAfterAddition,
        total: updatedCartsAfterAddition.reduce(
          (total, cart) => total + cart.price * cart.quantity,
          0,
        ),
      }
    case REMOVE_CART_ITEM:
      const updatedCartsAfterRemoval = state.carts.filter(
        (cart) => cart.id !== action.payload,
      )
      return {
        ...state,
        carts: updatedCartsAfterRemoval,
        total: updatedCartsAfterRemoval.reduce(
          (total, cart) => total + cart.price * cart.quantity,
          0,
        ),
      }
    case UPDATE_QUANTITY:
      const updatedCartsAfterQuantityUpdate = state.carts.map((cart) =>
        cart.id === action.payload.id
          ? { ...cart, quantity: action.payload.quantity }
          : cart,
      )
      return {
        ...state,
        carts: updatedCartsAfterQuantityUpdate,
        total: updatedCartsAfterQuantityUpdate.reduce(
          (total, cart) => total + cart.price * cart.quantity,
          0,
        ),
      }
    case CLEAR_CART:
      return {
        ...state,
        carts: [],
        total: 0,
      }
    default:
      return state
  }
}

export default reducer
