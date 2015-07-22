(function (window, THUNDERSTORM, $) {
    'use strict';
    var utility = {};
    
    function nth(d) {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    }
    utility.keyInLocalStorage = function (key) {
        if (window.localStorage.getItem(key) === null) {
            return false;
        }
        return true;
    };

    utility.createArticle = function (articleData, articleIndex, isFullContent) {
        var base = $('<div></div>').addClass('article-wrapper'),
            article = $('<article></article>'),
            articleTitle = $('<h2></h2>').data('article-index', 3).html(articleData.title),
            articleImage = $('<img>'),
            articleContent = $('<div></div>').addClass('article-content'),
            articleInfo = $('<div></div>').addClass('article-info'),
            articleText = $('p'),
            articleAction = $('button').addClass('btn btn--more').data('article-index', articleIndex),
            articleAuthor = $('<span></span>').addClass('article-info__author').html(articleData.author),
            articleDate = $('<span></span>').addClass('article-info__date').html(utility.dateFormatter(articleData.published)),
            articleGallery,
            imageGalleryObj;
        imageGalleryObj = imageSourceGenerator(articleData);

        articleImage.attr('src', imageGalleryObj.sources[0]);
        isFullContent ? articleContent.html(articleData.content) : articleContent.html(articleData.description);
        /*append the elements*/
        articleInfo.append(articleAuthor).append(articleDate);
        
        if (imageGalleryObj.hasGallery) {
            articleGallery = $('<span></span>').addClass('article-info__gallery');
            articleInfo.append(articleGallery);
        }
        articleInfo.append(articleImage);
        articleContent.append(articleInfo).append(articleText).append(articleAction);
    };

    utility.dateFormatter = function (date) {
        //dd mm yyyy
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        date = date.split('-');
        return months[parseInt(date[1], 10)] + " " + date[0] + nth(date[0]) + ", " + date[2]; 
    };
    
    function imageSourceGenerator(articleData) {
        var imageSourceObj = {},
            index;
        imageSourceObj.sources = [];
        if (articleData.gallery.length > 0) {
            imageSourceObj.hasGallery = true;
            for (index = 0; index < articleData.gallery.length; index = index + 1) {
                imageSourceObj.sources.push(articleData.gallery[index]);
            }
        } else {
            imageSourceObj.hasHallery = false;
            imageSourceObj.sources.push(articleData.featuredImage)
        }
        return imageSourceObj;
    }
    
    utility.createRecentArticle = function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                //console.log(key);
            }
        }
    };
    
    THUNDERSTORM.modules.utility = utility;
   
}(window, window.THUNDERSTORM, window.jQuery));