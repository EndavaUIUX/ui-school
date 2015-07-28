(function () {
    'use strict';
    var utility = THUNDERSTORM.modules.utility,
        articleIndex = window.location.href.substr(window.location.href.indexOf("#") + 1);
    var test = THUNDERSTORM.modules.articles.data[articleIndex];
  //  console.log(test);
    utility.populateArticleDetails(test, articleIndex);
}());