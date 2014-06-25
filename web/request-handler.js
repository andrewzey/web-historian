var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require("fs");

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if(req.method === 'GET' && req.url === "/") {
    fs.readFile(archive.paths.siteAssets + "/index.html", function (err, data) {
      console.log('hi');
      console.log(req.url);
      if (err) throw err;
      res.writeHead(200, httpHelpers.headers);
      res.end(data);
      console.log('hi again');
      console.log(req.url);
    });
  } else {
    res.writeHead(404, httpHelpers.headers);
    res.end('Nice try hacker');
  }
  // res.end(archive.paths.list);
};
