(function () {
    'use strict';
    var utility = THUNDERSTORM.modules.utility;
    var articleIndex = window.location.href.substr(window.location.href.indexOf("#") + 1);
    for(var i = 0, len = THUNDERSTORM.modules.articles.data.length; i < len; i++) {
        if(THUNDERSTORM.modules.articles.data[i].id === articleIndex){
            utility.populateArticleDetails(THUNDERSTORM.modules.articles.data[i], i);
        }
    }
}());