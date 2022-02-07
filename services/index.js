const asyncHandler = require("../middleware/async");

class Service {
  constructor(model) {
    this.model = model;
  }

  createResource = asyncHandler(async (reqBody) => {
    return await this.model.create(reqBody);
  });

  getAll = asyncHandler(async (query, page, limit) => {
    let finalQuery = query || {},
      finalPage = page || 1,
      finalLimit = limit || 10;

    return await this.model.paginate(finalQuery, {
      page: finalPage,
      limit: finalLimit,
    });
  });

  searchValues = asyncHandler(async (searchWords) => {
    return await this.model.aggregate([
      { $match: { searchKeywords: { $in: searchWords } } },
      {
        $project: {
          question: 1,
          name: 1,
          answer: 1,
          order: {
            $size: { $setIntersection: [searchWords, "$searchKeywords"] },
          },
        },
      },
      { $sort: { order: -1 } },
    ]);
  });

  getOneById = asyncHandler(async (id) => {
    return await this.model.findById(id);
  });

  updateOneById = asyncHandler(async (id, reqBody) => {
    return await this.model.findByIdAndUpdate(id, reqBody, {
      new: true,
      runValidators: true,
    });
  });

  deleteById = asyncHandler(async (id) => {
    return await this.model.findByIdAndDelete(id);
  });
}

module.exports = Service;
