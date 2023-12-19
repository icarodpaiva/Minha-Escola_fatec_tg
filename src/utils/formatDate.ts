export const formatDate = (date: string): string => {
  const dateObject = new Date(date);

  return dateObject.toLocaleDateString('pt-br', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};
