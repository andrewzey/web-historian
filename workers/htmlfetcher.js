var archive = require('../helpers/archive-helpers.js');

archive.readListOfUrls(function(arr){
  //iterate through every url in array (ignore '')
  for (var i = 0; i < arr.length; i++) {
    var site = arr[i];
    //check if it's archived
    archive.isURLArchived(site, function(exists){
      //if not, download it
      if (!exists) {
        archive.downloadSite(site);
      }
    });
  }
});
