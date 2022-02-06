const express = require("express");

// Security
const security = require("./expressLoader/security");

// Utility
const errorHandler = require("../middleware/error");
const developmentHelpers = require("./expressLoader/dev");

// Api maker
const Api = require("../api");
const ModelData = require("../models/modelData");

// Models for Api maker
const Subject = require("../models/Subject");
const Question = require("../models/Question");
const Answer = require("../models/Answer");

// Routers

module.exports = (app) => {
  // Body parser
  app.use(express.json());

  // Security
  security(app);

  // Dev logging middleware
  developmentHelpers(app);

  // Create API Instance
  let v1Api = new Api({
    // Prefix for all api routes. Default is index ("/").
    routePrefix: "/api/v1",
  });

  // Set model data
  let subjectModelData = new ModelData({
    // Model: Mongoose model
    apiModel: Subject,

    // Model Name: Name that will be used for your route (singular).
    modelName: "subject",
  });

  let questionModelData = new ModelData({
    // Model: Mongoose model
    apiModel: Question,

    // Model Name: Name that will be used for your route (singular).
    modelName: "question",
  });

  let answerModelData = new ModelData({
    // Model: Mongoose model
    apiModel: Answer,

    // Model Name: Name that will be used for your route (singular).
    modelName: "answer",
  });

  // Add model data to API
  v1Api.addModelData(subjectModelData);
  v1Api.addModelData(questionModelData);
  v1Api.addModelData(answerModelData);

  app.use(express.static("public"));

  // Mount routers
  v1Api.initRouters(app);

  app.use("/", (req, res) => {
    res.status(200).json({ success: true });
  });

  // Custom error handler middleware
  app.use(errorHandler);

  return app;
};
