export const fixDate = (date?: string) => {
  const dateObject = date ? new Date(date) : new Date()
  dateObject.setHours(dateObject.getHours() - 3)

  return dateObject.toISOString()
}
