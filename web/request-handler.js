var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require("fs");



exports.handleRequest = function (req, res) {

  var requestRouter = {
    'GET': httpHelpers.getHandler,
    'POST': httpHelpers.postHandler
  };

  if (requestRouter.hasOwnProperty(req.method)) {
    requestRouter[req.method](req, res);
  } else {
    httpHelpers.send404(res);
  }
};
