import { ADD_TO_CART, REMOVE_CART_ITEM } from '@/constants'

export const initState = {
  carts: [],
}

function reducer(state = initState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      // eslint-disable-next-line no-case-declarations
      const itemExists = state.carts.some(
        (cart) => cart.id === action.payload.id,
      )
      if (itemExists) {
        return state
      } else {
        return {
          ...state,
          carts: [...state.carts, action.payload],
        }
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        carts: state.carts.filter((cart) => cart.id !== action.payload),
      }
    default:
      return state
  }
}

export default reducer
