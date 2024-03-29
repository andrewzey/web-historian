var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset) {
  var assetFolder = (asset === "index.html" || asset === "loading.html") ? archive.paths.siteAssets : archive.paths.archivedSites;
  fs.readFile( assetFolder + "/" + asset, function (err, data) {
    if (err) throw err;
    exports.sendResponse(res, 200, data);
  });
};

exports.redirect = function(res, location){
  exports.headers['Location'] = '/' + location;
  exports.sendResponse(res, 302, location);
  delete exports.headers['Location'];
};

exports.sendResponse = function(res, statusCode, data) {
  res.writeHead(statusCode, exports.headers);
  res.end(data);
};

exports.send404 = function(res){
  exports.sendResponse(res, 404, 'Not Found');
};


exports.getHandler = function(req, res) {

  var asset = req.url.split("/")[1]; //for all GET requests except index and loading

  if (req.url === "/") {
    exports.serveAssets(res, 'index.html');
  }

  else if (req.url === "/loading") {
    exports.serveAssets(res, 'loading.html');
  }

  else if (asset !== undefined) {
    archive.isURLArchived(asset, function(exists){
      if (exists) {
        exports.serveAssets(res, asset);
      } else {
        exports.send404(res);
      }
    });
  }
};

exports.postHandler = function(req, res) {
  var requestURL = '';
  req.on('data', function(chunk) {
    requestURL += chunk;
  });

  req.on('end', function(){
    //gets rid of "url=" in data received from POST request
    requestURL = requestURL.slice(4);

    archive.isURLArchived(requestURL, function(exists) {
      if(exists) {
        exports.redirect(res, requestURL);
      }
      else {
        exports.redirect(res, 'loading');
      }
    });

    archive.readListOfUrls(function(arr){
      archive.isUrlInList(arr, requestURL, function(isFound){
        if (!isFound) {
          //archive.addUrlToList(requestURL);
        }
      });
    });

  });
};
