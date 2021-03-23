export const getTodayString = () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = date.getMonth().toString();
  const day = date.getDate().toString();
  return `${year}-${month}-${day}`;
};
