(function () {
    'use strict';
    var utility = THUNDERSTORM.modules.utility;
    var articleIndex = window.location.href.substr(window.location.href.indexOf("#") + 1);
    for(var i = 0, len = THUNDERSTORM.articleData.length; i < len; i++) {
        if(THUNDERSTORM.articleData[i].id === articleIndex){
            utility.populateArticleDetails(THUNDERSTORM.articleData[i], i);
        }
    }
}());