const findDistanceOfBusStop = (currentShir, currentDolg, shirotaOst, dolgotaOst) => {
  const R = 6371e3;
  const φ1 = (currentShir * Math.PI) / 180;
  const φ2 = (shirotaOst * Math.PI) / 180;
  const Δφ = ((shirotaOst - currentShir) * Math.PI) / 180;
  const Δλ = ((dolgotaOst - currentDolg) * Math.PI) / 180;
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const S = R * c;

  return S;
};

export default findDistanceOfBusStop;
