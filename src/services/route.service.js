import Route from '../models/Route.js';

class RouteService {
  routes = Route;

  async findeRoute(params) {
    return this.routes.find(params).lean();
  }
}

const routeService = new RouteService();
export default routeService;
