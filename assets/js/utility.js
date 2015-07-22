(function (window, THUNDERSTORM, $) {
    'use strict';
    var utility = {};

    utility.keyInLocalStorage = function (key) {
        if (window.localStorage.getItem(key) === null) {
            return false;
        }
        return true;
    };

    utility.createArticle = function (obj, articleIndex) {
        var base = $('div').addClass('article-wrapper'),
            article = $('article'),
            articleTitle = $('h2').data('article-index', articleIndex),
            articleContent = $('div').addClass('article-content'),
            articleInfo = $('div').addClass('article-info'),
            articleText = $('p'),
            articleAction = $('button').addClass('btn btn--more').data('article-index', articleIndex),
            articleAuthor = $('span').addClass('article-info__author'),
            articleDate = $('span').addClass('article-info__date'),
            key;
        debugger;
        for (key in obj) {
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
   
}(window, window.THUNDERSTORM, window.jQuery));