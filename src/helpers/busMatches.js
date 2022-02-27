export const busMatches = (busTime, currentHour, currentMin) => {
  const hours = Number(busTime.substring(0, 2));
  const minutes = Number(busTime.substring(3, 5));

  if (hours > currentHour) {
    return true;
  }
  return hours === currentHour && minutes > currentMin;
};
