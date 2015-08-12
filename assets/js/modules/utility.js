(function (window, THUNDERSTORM, $) {
    'use strict';
    var utility = {};

    function nth(d) {
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
    
    utility.clearArticles = function () {
        var articleContainer = $('.main, .content--search');
        articleContainer.empty();
    };
    
    utility.imageSourceGenerator = function (articleData) {
        var imageSourceObj = {};
        var index;
        var galleryLen = articleData.gallery.length;
        imageSourceObj.sources = [];
        if (galleryLen > 0) {
            imageSourceObj.hasGallery = true;
            for (index = 0; index < galleryLen; index = index + 1) {
                imageSourceObj.sources.push(articleData.gallery[index]);
            }
            imageSourceObj.sources.unshift(articleData.featuredImage);
        } else {
            imageSourceObj.hasGallery = false;
            imageSourceObj.sources.push(articleData.featuredImage);
        }
        return imageSourceObj;
    };

    utility.keyInLocalStorage = function (key) {
        if (window.localStorage.getItem(key) === null) {
            return false;
        }
        return true;
    };

    /*Format the article date in this format: //dd mm yyyy*/
    utility.dateFormatter = function (date, hasYear) {
        var months = ['January', 'February', 'March', 'April',
                      'May', 'June', 'July', 'August', 'September',
                      'October', 'November', 'December'];
        date = date.split('-');
        if (hasYear) {
            return  months[parseInt(date[1], 10)] + " " +
                    parseInt(date[0], 10) +
                    nth(date[0]) + ", " + date[2];
        }
        return  months[parseInt(date[1], 10)] + " " +
                parseInt(date[0], 10) + nth(date[0]);
    };

    utility.nameFormatter = function (name, stripLast) {
        var fullName = name.split(' ');
        if (stripLast) {
            return fullName[0] + " " + fullName[1].charAt(0) + ".";
        }
        return fullName;
    };

    utility.populateArticleDetails = function (articleData, articleBody) {
        articleBody.html(articleData.content);
    };

    utility.populateArticleTitle = function (elementsObject, articleContent) {
        elementsObject.titleContainer.html(articleContent.title);
        elementsObject.infoAuthor.html(utility.nameFormatter(articleContent.author, 1));
        elementsObject.infoDate.html(utility.dateFormatter(articleContent.published, 1));
    };

    utility.validateURL =  function (url, articles) {
        var articleNumber = url.split("?")[1],
            regex = new RegExp("^[0-9]+$");
        if (url.indexOf("?") === -1 ||
                articleNumber === "" ||
                articleNumber >= articles.length ||
                articleNumber < 0 ||
                !regex.test(articleNumber)) {
            window.location.href = "/";
        }
        return parseInt(articleNumber, 10);
    };

    utility.showModal = function ($modalSelector) {
        var $overlay = $('.overlay');
        $overlay.fadeIn();
        $modalSelector.fadeIn();
    };

    utility.dismissModal = function ($modalSelector) {
        var $overlay = $('.overlay');
        $overlay.fadeOut();
        $modalSelector.fadeOut();
    };


     // ACCEPT LETTERS / NUMBERS / : / & / - / LENGTH MORE THAN 0
    utility.validateInput = function (inputValue, errorElement) {
        var regex = new RegExp("^[a-zA-Z0-9-& ]+$");

        utility.cleanErrors(errorElement);
        if (inputValue.length === 0 || !regex.test(inputValue)) {
            $(".errorContainer").html("The input value is not valid.");
            errorElement.removeClass('hideError');
            errorElement.addClass('errorSearch');
            return false;
        }
        return true;
    };

    // add & remove paragraph if i have or not invalid text input
    utility.cleanErrors = function (element) {
        element.removeClass('errorSearch');
        element.addClass('hideError');
        $(".errorContainer").html("");
    };

   // split the current url from gallery[]
   // check http https www
   //save the rest url until /
    utility.takeDomainUrl = function (url) {
        if (url.indexOf("http://") !== -1) {
            url = url.substr(7);
        }

        if (url.indexOf("https://") !== -1) {
            url = url.substr(8);
        }

        if (url.indexOf("www.")  !== -1) {
            url = url.substr(4);
        }
        return url.split('/')[0];
    };

    utility.clipText = function (description, clipLimit) {
        var text;
        if (description.length > clipLimit) {
            text = description.substr(0, clipLimit);
            for (var i = text.length; i > 0; i = i - 1) {
                if (text[i] === " ") {
                    text = text.substr(0, i);
                    break;
                }
            }
            text = text.split(' ');
            text[text.length] = " . . .";
            text = text.join(' ');
            return text;
        } else {
            text = description.substr(0, clipLimit);
        }
        return text;
    };

    utility.sortLatestArticlesAccessed = function (article) {
        var temp,
            found;

        do {
            found = false;
            for (var index = 0; index < article.length - 1; index = index + 1) {
                if (article[index].count > article[index + 1].count) {
                    temp = article[index].count;
                    article[index].count = article[index + 1].count;
                    article[index + 1].count = temp;
                    found = true;
                }
            }
        } while (found);

        return utility.generateListHTML(article, THUNDERSTORM.modules.articles.data);
    };

    utility.generateListHTML = function (latestArticlesAccessed, allArticles) {
        var menuRight = $('.article-recent'),
            titleListParent = $("<ul></ul>").addClass('recent-list');

        for (var i = 0; i < latestArticlesAccessed.length; i = i + 1) {
            if (latestArticlesAccessed[i].articleIndex < 10) {
                var listItem = $("<li></li>"),
                    articleIndex = latestArticlesAccessed[i].articleIndex,
                    linkRedirect = $('<a></a>').attr("href", "article?" + latestArticlesAccessed[i].articleIndex);

                linkRedirect.html(utility.clipText(allArticles.articles[articleIndex].title, 20));

                listItem.append(linkRedirect);
                //titleListParent.append(listItem);
                titleListParent.prepend(listItem);
            }
        }
        menuRight.append(titleListParent);
    };

    THUNDERSTORM.modules.utility = utility;

}(window, window.THUNDERSTORM, window.jQuery));