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
        console.log("Article data", articleData);
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
        console.log("Image Source Obj",imageSourceObj);
        return imageSourceObj;
    }

    utility.keyInLocalStorage = function (key) {
        if (window.localStorage.getItem(key) === null) {
            return false;
        }
        return true;
    };

    utility.createArticle = function (articleData, articleIndex, isFullContent) {
        var base = $('<div></div>').addClass('article-wrapper'),
                article = $('<article></article>').attr('data-article-index', articleIndex),
                articleTitle = $('<h2></h2>').html(articleData.title),
                articleImage = $('<img>').css('height', 182),
                articleContent = $('<div></div>').addClass('article__content'),
                articleInfo = $('<div></div>').addClass('article-info'),
                articleText = $('<p>'),
                articleAction = $('<button></button>').addClass('btn btn--more').html('Read More'),
                articleAuthor = $('<span></span>').addClass('article-info__author article-info__pill').html(articleData.author),
                articleDate = $('<span></span>').addClass('article-info__date article-info__pill').html(utility.dateFormatter(articleData.published)),
                articleGallery,
                imageGalleryObj;

        imageGalleryObj = utility.imageSourceGenerator(articleData);
        articleImage.attr('src', imageGalleryObj.sources[0]);
        isFullContent ? articleText.html(articleData.content) : articleText.html(articleData.description);
        /*append the elements*/
        articleInfo.append(articleAuthor);
        articleInfo.append(articleDate);

        if (imageGalleryObj.hasGallery) {
            articleGallery = $('<span></span>').addClass('article-info__gallery article-info__pill').html('Photo Gallery');
            articleInfo.append(articleGallery);
        }
        articleInfo.append(articleImage);
        articleContent.append(articleInfo);
        article.append(articleTitle);
        article.append(articleContent);
        article.append(articleText);
        article.append(articleAction);
        base.append(article);
        return base;
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
    utility.generateArticles = function (data, parent) {
        var index,
            myArticle,
            limit;
        if (!THUNDERSTORM.statistics.hasOwnProperty('generatedCount')) {
            THUNDERSTORM.statistics.generatedCount = 0;
        } else {
            if (THUNDERSTORM.statistics.generatedCount === data.length) {
                $('.action').hide('fast');
                return false;
            }
        }
        limit = THUNDERSTORM.statistics.generatedCount;
        //debugger;
        for (index = THUNDERSTORM.statistics.generatedCount; index < limit + 6; index = index + 1) {
            if (index >= data.length) {
                return true;
            }
            index === 0 ? myArticle = utility.createRecentArticle(data[index], index)
                    : myArticle = utility.createArticle(data[index], index, 0);
            parent.append(myArticle);
            THUNDERSTORM.statistics.generatedCount += 1;
        }
        if (THUNDERSTORM.statistics.generatedCount + 6  < data.length) {
            $('.action').show('fast');
        } else {
            $('.action').hide('fast');
        }
    };

    utility.createRecentArticle = function (articleData, articleIndex) {
        //TODO needs a simpler structure :(
        var base = $('<article></article>').addClass('latest__article').attr('data-article-index', articleIndex),
                articleContent = $('<div></div>').addClass('article__content'),
                articleTitle = $('<h2></h2>').addClass('article__title').html(articleData.title),
                articleHiddenImgContainer = $('<div></div>').addClass('article__picture'),
                articleHiddenImage = $('<img>'),
                articleVisibleImgTag = $('<img>'),
                articleVisibleImage = $('<div></div>').addClass('article__img'),
                articleInfo = $('<div></div>').addClass('article__informations'),
                articleText = $('<p>').addClass('article_description'),
                articleAction = $('<button></button>').addClass('btn btn--more').html('Read More'),
                articleAuthor = $('<span></span>').addClass('article__author article_info').html(articleData.author),
                articleDate = $('<span></span>').addClass('article__date article_info').html(utility.dateFormatter(articleData.published)),
                articleGallery,
                imageGalleryObj;
        imageGalleryObj = utility.imageSourceGenerator(articleData);
        articleHiddenImage.attr('src', imageGalleryObj.sources[0]);
        articleVisibleImgTag.attr('src', imageGalleryObj.sources[0]);
        articleText.html(articleData.description);
        /*append the elements*/
        articleInfo.append(articleAuthor);
        articleInfo.append(articleDate);
        if (imageGalleryObj.hasGallery) {
            articleGallery = $('<span></span>').addClass('article__gallery article_info').html('Photo Gallery');
            articleInfo.append(articleGallery);
        }
        articleContent.append(articleTitle);
        articleContent.append(articleInfo);

        articleHiddenImgContainer.append(articleHiddenImage);

        articleContent.append(articleHiddenImgContainer);

        articleContent.append(articleText);
        articleContent.append(articleAction);
        base.append(articleContent);
        articleVisibleImage.append(articleVisibleImgTag);
        base.append(articleVisibleImage);
        return base;
    };

    THUNDERSTORM.modules.utility = utility;

}(window, window.THUNDERSTORM, window.jQuery));