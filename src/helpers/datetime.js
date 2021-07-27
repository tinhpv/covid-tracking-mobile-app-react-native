export const convertToDateString = timeStamp => {
  const date = new Date(timeStamp);
  return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};
