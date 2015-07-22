(function (window, THUNDERSTORM) {
    'use strict';
    var utility = {};

    utility.keyInLocalStorage = function (key) {
        if (window.localStorage.getItem(key) === null) {
            return false;
        }
        return true;
    };
    
    utility.createArticle = function (obj) {
      var base = 
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                console.log(key);
            }
        }
    };
    
    utility.createRecentArticle = function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                console.log(key);
            }
        }
    };
    
    THUNDERSTORM.modules.utility = utility;
   
}(window, window.THUNDERSTORM));