export const initState = {
  carts: [],
  cartInput: '',
}

function reducer(state = initState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        carts: [...state.carts, action.payload],
      }
    case 'DELETE_CART_ITEM':
      return {
        ...state,
        carts: state.carts.filter((cart) => cart.id !== action.payload),
      }
    default:
      return state
  }
}

export default reducer
