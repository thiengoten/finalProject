import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_CART_ITEM,
  UPDATE_QUANTITY,
} from '@/constants/ConstValue'

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  }
}

export const removeCardItem = (id) => {
  return {
    type: REMOVE_CART_ITEM,
    payload: id,
  }
}

export const updateQuantity = (id, quantity) => {
  return {
    type: UPDATE_QUANTITY,
    payload: { id, quantity },
  }
}

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  }
}
