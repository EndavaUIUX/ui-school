(function (window, THUNDERSTORM, $) {
    'use strict';
    var utility = {};

    function nth(d) {
        if (d > 3 && d < 21)
            return 'th';
        switch (d % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }

    utility.imageSourceGenerator = function (articleData) {
        var imageSourceObj = {},
                index;
        imageSourceObj.sources = [];
        if (articleData.gallery.length > 0) {
            imageSourceObj.hasGallery = true;
            for (index = 0; index < articleData.gallery.length; index = index + 1) {
                imageSourceObj.sources.push(articleData.gallery[index]);
            }
            imageSourceObj.sources.unshift(articleData.featuredImage);
        } else {
            imageSourceObj.hasGallery = false;
            imageSourceObj.sources.push(articleData.featuredImage)
        }
        return imageSourceObj;
    };

    utility.keyInLocalStorage = function (key) {
        if (window.localStorage.getItem(key) === null) {
            return false;
        }
        return true;
    };

    utility.dateFormatter = function (date, hasYear) {
        //dd mm yyyy
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        date = date.split('-');
        if (hasYear) {
            return months[parseInt(date[1], 10)] + " " + date[0] + nth(date[0]) + ", " + date[2];
        }
        return months[parseInt(date[1], 10)] + " " + date[0] + nth(date[0]);
    };

    utility.populateArticleDetails = function(articleData, articleBody) {
        articleBody.html(articleData.content);
        // console.log("articleData: ", articleData);
    };

    utility.populateArticleTitle = function(elementsObject, articleContent) {
        console.log("articleContent: ", articleContent);
        // articleContent.author;
        // console.log("articleData: ", articleData);
        console.log("elementsObject: ", elementsObject);
        elementsObject.titleContainer[0].innerHTML = articleContent.title;
        elementsObject.infoAuthor[0].innerHTML = articleContent.author;
        elementsObject.infoDate[0].innerHTML = utility.dateFormatter(articleContent.published, 1);
    };   


    THUNDERSTORM.modules.utility = utility;

}(window, window.THUNDERSTORM, window.jQuery));