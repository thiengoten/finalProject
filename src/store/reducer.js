import { ADD_TO_CART, REMOVE_CART_ITEM, UPDATE_QUANTITY } from '@/constants'

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
          carts: [...state.carts, { ...action.payload, quantity: 1 }],
        }
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        carts: state.carts.filter((cart) => cart.id !== action.payload),
      }
    case UPDATE_QUANTITY:
      return {
        ...state,
        carts: state.carts.map((cart) =>
          cart.id === action.payload.id
            ? { ...cart, quantity: action.payload.quantity }
            : cart,
        ),
      }
    default:
      return state
  }
}

export default reducer
