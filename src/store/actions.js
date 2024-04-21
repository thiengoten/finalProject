import { ADD_TO_CART, REMOVE_CART_ITEM } from '@/constants/ConstValue'

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
