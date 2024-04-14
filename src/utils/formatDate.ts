export const formatDate = (
  date: string,
  withWeekday?: boolean,
  withTime?: boolean
) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    weekday: withWeekday ? "long" : undefined,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: withTime ? "2-digit" : undefined,
    minute: withTime ? "2-digit" : undefined
  })
}
