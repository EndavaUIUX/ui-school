(function (window, THUNDERSTORM, $) {
    'use strict';
    var THUNDERSTORM = THUNDERSTORM || {};
    THUNDERSTORM.modules = THUNDERSTORM.modules || {};
    var utility = {};

    utility.nth = function (d) {
        if (d >=10 && d <= 20) {
            return 'th';
        }
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
    
    utility.clearArticles = function (container) {
        container.empty();
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

    utility.keyInLocalStorage = function (key, storageInterface) {
        if (storageInterface.getItem(key) === null || typeof storageInterface.getItem(key) === 'undefined') {
            return false;
        }
        return true;
    };

    /*Format the article date in this format: //dd mm yyyy*/
    utility.dateFormatter = function (date, hasYear) {
        var months = ['January', 'February', 'March', 'April',
                      'May', 'June', 'July', 'August', 'September',
                      'October', 'November', 'December'];
        date = date.split(/[.,\/ -]/);
        if (date[0].length > 2 || date[1].length > 2 || date[2].length !== 4) {
            //not doing any further processing as the date should be given in this format..
            throw new Error('Format should be dd-mm-yyyy or dd/mm/yyyy');
        }
        if (hasYear) {
            return  months[parseInt(date[1], 10) - 1] + " " +
                    parseInt(date[0], 10) +
                    utility.nth(date[0]) + ", " + date[2];
        }
        return  months[parseInt(date[1], 10) - 1] + " " +
                parseInt(date[0], 10) + utility.nth(date[0]);
    };

    utility.nameFormatter = function (name, stripLast) {
        var fullName;
        var res = '';
        if (typeof name !== 'string') {
            throw new Error('Name needs to be a string!');
        }
        fullName = name.split(' ');
        if (stripLast) {
            fullName.forEach(function (currentValue, index) {
                if (index === 0) {
                    res = res + currentValue + " ";
                } else {
                    res = res + currentValue.charAt(0) + "." + " ";
                }
            })
            return res;
        }
        return fullName;
    };

    utility.populateArticleDetails = function (articleData, articleBody) {
        articleBody.append(articleData.content);
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

    utility.generateListHTML = function (latestArticlesAccessed, allArticles) {
        var menuRight = $('.article-recent'),
            titleListParent = $("<ul></ul>").addClass('recent-list');

            for(var i = 0; i < latestArticlesAccessed.length; i++) {
                var listItem = $("<li></li>"),
                    articleIndex = latestArticlesAccessed[i].articleIndex,
                    linkRedirect = $('<a></a>').attr("href", "article?" + latestArticlesAccessed[i].articleIndex);

                linkRedirect.html(utility.clipText(allArticles["articles"][articleIndex].title, 20));

                listItem.append(linkRedirect);
                if(titleListParent.children().length === 10) {
                   break;
                } else {
                    titleListParent.prepend(listItem);
                }


            }
        menuRight.append(titleListParent);
    };

    THUNDERSTORM.modules.utility = utility;
    window.THUNDERSTORM = THUNDERSTORM;
}(window, window.THUNDERSTORM, window.jQuery));