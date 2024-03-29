var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, {encoding: "utf8"}, function(err, data) {
    if (err) throw err;
    var arr = data.split('\n');
    callback(arr);
  });
};

exports.isUrlInList = function(arr, target, callback){
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] === target) {
      callback(true);
    }
  }
  callback(false);
};

exports.addUrlToList = function(target){
  // var urlList = exports.readListOfUrls();
  // urlList.push(target);
  // urlList.join('\n');
  // fs.writeFile(exports.paths.list, urlList, function(err) {
  //   if (err) throw err;
  //   console.log('URL list successfully updated');
  // });
};

exports.isURLArchived = function(webURL, callback){
  var pathName = exports.paths.archivedSites + "/" + webURL;
  fs.exists(pathName, function(exists) {
    callback(exists);
  });
};

exports.downloadSite = function(){
};
