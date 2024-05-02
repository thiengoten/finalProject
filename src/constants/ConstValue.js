export const ITEMS_PER_PAGE = 5
export const ORDER_ITEM_PER_PAGE = 10
export const USER_ITEM_PER_PAGE = 10

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
export const CLEAR_CART = 'CLEAR_CART'

export const columns = [
  { name: 'ID', uid: 'id' },
  { name: 'NAME', uid: 'name' },
  { name: 'DESCRIPTION', uid: 'description' },
  { name: 'PRICE', uid: 'price' },
  { name: 'IMAGE', uid: 'image' },
  { name: 'CATEGORY', uid: 'category' },
  { name: 'ACTIONS', uid: 'actions' },
]

export const orderColumns = [
  { name: 'ID', uid: 'id' },
  { name: 'STATUS', uid: 'status' },
  { name: 'USER', uid: 'user' },
  { name: 'TOTAL', uid: 'total_amount' },
  { name: 'ACTIONS', uid: 'actions' },
]

export const userColumns = [
  { name: 'ID', uid: 'id' },
  { name: 'NAME', uid: 'full_name' },
  { name: 'EMAIL', uid: 'email' },
  { name: 'ROLE', uid: 'user_role' },
  // { name: 'ACTIONS', uid: 'actions' },
]

export const userOrderColumns = [
  { name: 'ID', uid: 'id' },
  { name: 'TOTAL', uid: 'total_amount' },
  { name: 'STATUS', uid: 'status' },
  { name: 'ACTIONS', uid: 'actions' },
]
