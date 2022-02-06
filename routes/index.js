const Controller = require("../controllers/index.js");

class Router {
  constructor(model, modelName, controller) {
    this.controller = controller || new Controller(model, modelName);
    this.router = require("express").Router({ mergeParams: true });

    this.endpoint = `/`;
    this.endpointWithId = `/:${modelName}Id`;

    this.router
      .route(this.endpoint)
      .post(this.controller.createResource)
      .get(this.controller.getAll);
    this.router
      .route(`${this.endpoint}s/search/`)
      .get(this.controller.searchValues);
    this.router
      .route(this.endpointWithId)
      .get(this.controller.getOneById)
      .put(this.controller.updateOneById)
      .delete(this.controller.deleteById);
  }

  create() {
    return this.router;
  }
}

module.exports = Router;
