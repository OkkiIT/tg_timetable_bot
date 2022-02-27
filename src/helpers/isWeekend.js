const isWeekend = () => {
  const date = new Date();
  return date.getDay() === (0 || 6);
};

export default isWeekend;
