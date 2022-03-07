const getTimetables = ({ items, multiplier, initialValue, index, busID }) => {
  const workingDay = [];
  const res = [];
  items[index * multiplier].querySelectorAll('span').forEach(item => workingDay.push(item.textContent));

  for (let time of workingDay) {
    const newTimeTable = {
      timing: time,
      type: 'workingDay',
      busStopID: initialValue[0].ID,
      busID,
    };
    res.push(newTimeTable);
  }

  if (multiplier === 1) {
    return res;
  }

  const weekendsDay = [];
  items[index * multiplier + 1].querySelectorAll('span').forEach(item => weekendsDay.push(item.textContent));

  for (let time of weekendsDay) {
    const newTimeTable = {
      timing: time,
      type: 'weekendsDay',
      busStopID: initialValue[0].ID,
      busID,
    };
    res.push(newTimeTable);
  }

  return res;
};

export default getTimetables