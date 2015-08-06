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

    /*Format the article date in this format: //dd mm yyyy*/
    utility.dateFormatter = function (date, hasYear) {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        date = date.split('-');
        if (hasYear) {
            return months[parseInt(date[1], 10)] + " " + parseInt(date[0], 10) + nth(date[0]) + ", " + date[2];
        }
        return months[parseInt(date[1], 10)] + " " + parseInt(date[0], 10) + nth(date[0]);
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
        var articleNumber = url.split("?")[1];
        if (url.indexOf("?") === -1 || articleNumber === "" || articleNumber >= articles.length || articleNumber < 0) {
            window.location.href = "/";
            return 0;
        }
        return articleNumber;
    };

    utility.showModal = function ($modalSelector) {
        var $overlay = $('.overlay');
        $overlay.fadeIn();
        $modalSelector.fadeIn();
    }
    utility.dismissModal = function ($modalSelector) {
        var $overlay = $('.overlay');
        $overlay.fadeOut();
        $modalSelector.fadeOut();      
    }


     // ACCEPT LETTERS / NUMBERS / : / & / - / LENGTH MORE THAN 0
    utility.validateInput = function(inputValue, errorElement) {
            var regex = new RegExp("^[a-zA-Z0-9-& ]+$");

            utility.cleanErrors(errorElement);
            if (inputValue.length === 0 || !regex.test(inputValue)) {
                errorElement.removeClass('hideError');
                errorElement.addClass('errorSearch');
                return false;
            }
            return true;
    };

    utility.cleanErrors = function(element) {
        element.removeClass('errorSearch');
        element.addClass('hideError');
    }
    
    $('.searchButton').click(function(e) {
        var inputValue = $('#search')[0].value,
            $errorElement = $('.search p');
        console.log(inputValue);
        utility.validateInput(inputValue, $errorElement);
    });  


    $('#search').keypress(function(e) {
        if (e.keyCode == 13) {
            $('.searchButton').click(); 
        }
    });

   
   utility.takeDomainUrl = function (url) {
        var domain = "";
        var page = ""; 

        if (url.indexOf("http://") == 0) {
            url = url.substr(7);
        } 

        if (url.indexOf("https://") == 0) {
            url = url.substr(8);
        } 

        if (url.indexOf("www.") == 0) {
            url = url.substr(4);
        }

        return url.split('/')[0];

    }

    THUNDERSTORM.modules.utility = utility;

}(window, window.THUNDERSTORM, window.jQuery));