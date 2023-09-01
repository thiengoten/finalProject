export const fetchLocalData = (key) => {
  const data = JSON.parse(localStorage.getItem(key))

  if (!data) return null

  return data
}
