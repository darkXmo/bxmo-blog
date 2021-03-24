export const getTodayString = (date: Date = new Date()) => {
  const year = date.getFullYear().toString();
  const month = (1 + date.getMonth()).toString();
  const day = date.getDate().toString();
  return `${year}-${month}-${day}`;
};

export const getDateString = (dateStr: string) => {
  return getTodayString(new Date(dateStr));
};
