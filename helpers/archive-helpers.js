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

exports.readListOfUrls = function(){
  //read the file and split by \n
  //return the array
};

exports.isUrlInList = function(target){
  //call readListOfUrls
  //iterate through each item
  //if target is in array, return true, else return false
  return true;
};

exports.addUrlToList = function(target){
  //call readListOfUrls
  //push target
  //join array by ('\n')
  //write the file to disk
};

exports.isURLArchived = function(webURL){
  return fs.existsSync(exports.paths.archivedSites + "/" + webURL);
};

exports.downloadSite = function(){
};
