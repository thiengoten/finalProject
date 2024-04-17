export const fetchLocalData = (key) => {
  const data = JSON.parse(localStorage.getItem(key))

  if (!data) return null

  return data
}

const columns = [
  { name: 'ID', uid: 'id' },
  { name: 'NAME', uid: 'name' },
  { name: 'DESCRIPTION', uid: 'description' },
  { name: 'PRICE', uid: 'price' },
  { name: 'IMAGE', uid: 'image' },
  { name: 'CATEGORY', uid: 'category' },
  { name: 'ACTIONS', uid: 'actions' },
]

export { columns }
