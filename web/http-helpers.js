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

exports.redirect = function(res, path){

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
    if (archive.isURLArchived(asset)) {
      exports.serveAssets(res, asset);
    }

    else {
      exports.send404(res);
    }
  }



};

exports.postHandler = function(req, res) {
  //something
};

// } else if(req.method === 'POST') {
//   var postData = '';
//   req.on('data', function(chunk) {
//     postData += chunk;
//   });
//   req.on('end', function(){
//     console.log(postData);
//     if(archive.isUrlInList(postData)) {
//       if(archive.isURLArchived(postData)) {
//         httpHelpers.headers['Location'] = '/' + postData;
//         res.writeHead(302, httpHelpers.headers);
//         res.end();
//         delete httpHelpers.headers['Location'];
//       }
//     } else {
//       archive.addUrlToList(postData);
//       httpHelpers.headers['Location'] = '/' + 'loading';
//       res.writeHead(302, httpHelpers.headers);
//       res.end();
//       delete httpHelpers.headers['Location'];
//     }
//   });
// }

// else {
//   res.writeHead(404, httpHelpers.headers);
//   res.end('Nice try hacker');
// }
