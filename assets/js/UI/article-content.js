
(function(window, THUNDERSTORM, $) {
    "use strict";
    THUNDERSTORM.modules.articles.init({
        sourceName : 'articles',
        shouldGenerate : false,
        callback: populateArticlePage
    });

    function populateArticlePage() {
        var pageUrl = window.location.href,
            utility = THUNDERSTORM.modules.utility,
            articleUrlNumber = utility.validateURL(pageUrl, THUNDERSTORM.modules.articles.data['articles']),
            article = THUNDERSTORM.modules.articles.data['articles'][articleUrlNumber],
            currentArticle = utility.imageSourceGenerator(article),
            viewMoreButton = $("<a></a>").html("View gallery").addClass("button__gallery").attr('href', '#'),
            icoViewMore = $('<i></i>'),
            articleContent = $(".article__body"),
            titleContainer = $('.title'),
            infoAuthor = $('.article-informations__author'),
            infoDate = $('.article-informations__date'),
            elementsObject = {titleContainer : titleContainer, infoAuthor : infoAuthor, infoDate : infoDate};
            viewMoreButton.append(icoViewMore);

            if (currentArticle.hasGallery == true) {
                var gallery;
                currentArticle.sources.filter(function(item, index) {
                    gallery = $("<img>").attr("src", item);
                    $(".article__gallery").append(gallery);
                    if(index != 0) gallery.addClass("hidden");
                });
                $(".article__gallery").addClass("hasGallery");
                $(".article__gallery").append(viewMoreButton);

            } else {
                gallery = $("<img>").attr("src", currentArticle.sources);
                $(".article__gallery").append(gallery);
            }

            utility.populateArticleTitle(elementsObject, article);
            utility.populateArticleDetails(article, articleContent);

            window.onload = function(){ 
                iterateGalleryPhotos(currentArticle, utility);
            } 
    }
    
    var iterateGalleryPhotos = function(article, utility) {
        /*var galleryImages = [],
            indexURL =  [], 
            galleryImages = article['gallery'];

       for(var j = 0, leng = galleryImages.length; j < leng; j++) {
            indexURL.push(utility.takeDomainUrl(galleryImages[j]));
       }*/

      // return indexURL;


      var indexURL =  [];
      for(var i = 0; i < article['sources'].length; i++ ) {
     
        indexURL.push(utility.takeDomainUrl(article['sources']));
        return indexURL;
      }
    };

    

    

    /* ==========================================================================
      event handlers.
     ========================================================================== */
    $('body').on('click', function (ev) {
            var container = $('.modal');
            if (!container.is(ev.target)  && container.has(ev.target).length === 0 && !$(ev.target).hasClass('.modal__close') && !$(ev.target).hasClass('button__gallery'))
              {
                THUNDERSTORM.modules.utility.dismissModal($('.modal'));
            }
        });
    $('.button__gallery').on('click', function (ev) {
        THUNDERSTORM.modules.utility.showModal($('.modal'));
    });
    
    $('.modal__close').on('click', function (ev) {
        THUNDERSTORM.modules.utility.dismissModal($('.modal'));
    });
}(window, window.THUNDERSTORM, window.jQuery));