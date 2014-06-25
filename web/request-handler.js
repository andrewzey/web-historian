var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require("fs");

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if(req.method === 'GET') {

    var webURL = req.url.split("/")[1];

    if (req.url === "/") {
      fs.readFile(archive.paths.siteAssets + "/index.html", function (err, data) {
        if (err) throw err;
        res.writeHead(200, httpHelpers.headers);
        res.end(data);
      });
    }

    else if (req.url.split("/")[1] !== undefined) {
      if (archive.isURLArchived(webURL)) {
        fs.readFile(archive.paths.archivedSites + "/" + webURL, function (err, data) {
          if (err) throw err;
          res.writeHead(200, httpHelpers.headers);
          res.end(data);
        });
      } else {
        res.writeHead(404, httpHelpers.headers);
        res.end();
      }
    }

  } else {
    res.writeHead(404, httpHelpers.headers);
    res.end('Nice try hacker');
  }
  // res.end(archive.paths.list);
};
