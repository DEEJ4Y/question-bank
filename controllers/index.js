const Service = require("../services/index.js");
const SuccessfulResponse = require("../middleware/succesfulResponse");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async.js");

class Controller {
  constructor(model, modelName, service) {
    this.service = service || new Service(model);
    this.modelName = modelName;
  }

  createResource = asyncHandler(async (req, res, next) => {
    const resource = await this.service.createResource(req.body);

    if (!resource) {
      return next(
        new ErrorResponse(
          `Oops! We could not create the ${this.modelName} you asked for. Try again later.`,
          404
        )
      );
    }

    new SuccessfulResponse(
      res,
      201,
      `The ${this.modelName} was successfully created.`,
      resource
    ).buildResponse();
  });

  getAll = asyncHandler(async (req, res, next) => {
    let search = req.query.search;
    let page = req.query.page;
    let limit = req.query.limit;
    let parentId = req.query.parentId;

    let query = {};

    if (search) {
      query.searchKeywords = {
        $in: [...search.toLowerCase().split(",")],
      };
    }
    if (parentId) {
      query.parentId = { $eq: parentId };
    }

    // console.log(query);
    const resources = await this.service.getAll(query, page, limit);

    if (!resources) {
      return next(
        new ErrorResponse(
          `Oops! The ${this.modelName}s could not be found. Try again later.`,
          404
        )
      );
    }

    new SuccessfulResponse(
      res,
      200,
      `The ${this.modelName}s were successfully found.`,
      resources
    ).buildResponse();
  });

  searchValues = asyncHandler(async (req, res, next) => {
    let search = req.query.search;
    let searchWords = [];
    if (search) {
      searchWords = search.toLowerCase().split(",");
    } else {
      return next(new ErrorResponse(`Please add some search terms.`, 404));
    }

    const resources = await this.service.searchValues(searchWords);

    if (!resources) {
      return next(
        new ErrorResponse(
          `Oops! The ${this.modelName}s could not be found. Try again later.`,
          404
        )
      );
    }

    new SuccessfulResponse(
      res,
      200,
      `The ${this.modelName}s were successfully found.`,
      resources
    ).buildResponse();
  });

  getOneById = asyncHandler(async (req, res, next) => {
    const id = req.params[`${this.modelName}Id`];
    const resource = await this.service.getOneById(id);

    if (!resource) {
      return next(
        new ErrorResponse(
          `A ${this.modelName} was not found with an id of ${id}`,
          404
        )
      );
    }

    new SuccessfulResponse(
      res,
      200,
      `The ${this.modelName} was successfully found.`,
      resource
    ).buildResponse();
  });

  updateOneById = asyncHandler(async (req, res, next) => {
    const id = req.params[`${this.modelName}Id`];
    const resource = await this.service.updateOneById(id, req.body);

    if (!resource) {
      return next(
        new ErrorResponse(
          `A ${this.modelName} was not found with an id of ${id}`,
          404
        )
      );
    }

    new SuccessfulResponse(
      res,
      200,
      `The ${this.modelName} was successfully updated.`,
      resource
    ).buildResponse();
  });

  deleteById = asyncHandler(async (req, res, next) => {
    const id = req.params[`${this.modelName}Id`];
    await this.service.deleteById(id);

    new SuccessfulResponse(
      res,
      200,
      `The ${this.modelName} was successfully updated.`,
      {}
    ).buildResponse();
  });
}

module.exports = Controller;
