const getFinalResult = finalRoutes => {
  const routesWithMatchedTimeTables = finalRoutes.filter(route => route.matchedTimeTables.length > 0);

  const map = routesWithMatchedTimeTables.reduce(function (acc, route) {
    if (acc[route.globalName]) {
      acc[route.globalName] = { name: route.name, matchedTimeTables: [...acc[route.globalName].matchedTimeTables, ...route.matchedTimeTables] };
      return acc;
    }
    acc[route.globalName] = { name: route.name, matchedTimeTables: route.matchedTimeTables };

    return acc;
  }, {});

  const concatedRoutes = Object.keys(map).map(function (k) {
    return { globalName: k, matchedTimeTables: map[k].matchedTimeTables, name: map[k].name };
  });

  const sortedRoutes = concatedRoutes.map(({ name, globalName, matchedTimeTables }) => ({
    name,
    globalName,
    matchedTimeTables: matchedTimeTables.sort(({ timing: firstTiming }, { timing: secondTiming }) => {
      const firstHours = Number(firstTiming.substring(0, 2));
      const firstMinutes = Number(firstTiming.substring(3, 5));

      const secondHours = Number(secondTiming.substring(0, 2));
      const secondMinutes = Number(secondTiming.substring(3, 5));

      if (firstHours > secondHours) {
        return 1;
      }
      if (firstHours === secondHours && firstMinutes > secondMinutes) {
        return 1;
      }
      return -1;
    }),
  }));

  const result = sortedRoutes.map(({ name, matchedTimeTables }) => {
    const timings = matchedTimeTables
      .slice(0, 3)
      .map(({ timing }) => timing)
      .join(', ');
    return {
      name,
      timings,
    };
  });

  return result;
};

export default getFinalResult;
