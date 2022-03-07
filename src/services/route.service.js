import Route from '../models/Route.js';

class RouteService {
  routes = Route;

  async findeRoute(params) {
    return this.routes.find(params).lean();
  }

  async saveNewRoute(arr) {
    await this.routes.remove();
    await this.routes.insertMany(arr);
  }
}

const routeService = new RouteService();
export default routeService;
