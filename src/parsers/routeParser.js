const routeParser = (urlPageDOM, busID) => {
  const regOnlyNumbers = /\d+/;
  const routeName = urlPageDOM.querySelector('#mlfSite > div.breadcrumb > ul > li:nth-child(7) > span').textContent;
  const routeGlobalName = routeName.match(regOnlyNumbers)[0];
  const routeBusStopsLinks = urlPageDOM.querySelectorAll('div.name>a');
  const routeBusStopsIDs = [];
  routeBusStopsLinks.forEach(item => {
    routeBusStopsIDs.push(item.getAttribute('href').match(regOnlyNumbers)[0]);
  });

  const newRoute = {
    busID,
    name: routeName,
    globalName: routeGlobalName,
    busStopsIDs: routeBusStopsIDs,
  };
  return newRoute;
};
export default routeParser;
