
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

            //  populate gallery from article content with modal source url 
                var imagesHolder = $('.modal .modal__images');
                    imagesHolder.html('');

                for(var i = 0; i < currentArticle.sources.length; i++) {
                    var modalImage = $('<div></div>').addClass('modal__image'),
                        img = $('<img>').attr('src', currentArticle.sources[i]),
                        sourceUrl = $('<a></a>').addClass('modal__source').attr('href', '#').html(utility.takeDomainUrl(currentArticle.sources[i]));      
                    
                    if(i !== 0) {
                        modalImage.hide();
                    } else { 
                        modalImage.append(img).append(sourceUrl);
                        imagesHolder.append(modalImage);
                    }
                }
            console.log($('.modal__image img').width());
            //$('.modal').css({'width' : $('.modal__image img').width()+'px'});
            // Get on screen image
            var screenImage = $(".modal__image img");
            
            // Create new offscreen image to test
            var theImage = new Image();
            theImage.src = screenImage.attr("src");
            
            // Get accurate measurements from that.
            var imageWidth = theImage.width;
            var imageHeight = theImage.height;
            $('.modal').css({'width' : (imageWidth+170) + 'px'});
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
        var indexURL =  [];
        for(var i = 0; i < article['sources'].length; i++ ) {
            indexURL.push(utility.takeDomainUrl(article['sources'][i]));
        }

        return indexURL;
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
    
    
    
    var swipeFunction = {
        
        touches : {
            "touchstart": {"x": -1, "y": -1}, 
            "touchmove" : {"x": -1, "y": -1}, 
            "touchend"  : false,
            "direction" : "undetermined"
        },
        
        touchHandler: function(event) {
            var touch;
            if (typeof event !== 'undefined') {  
                event.preventDefault(); 
                if (typeof event.touches !== 'undefined') {
                    touch = event.touches[0];
                    // console.log(event.type);
                    switch (event.type) {
                        case 'touchstart':
                        case 'touchmove':
                            swipeFunction.touches[event.type].x = touch.pageX;
                            swipeFunction.touches[event.type].y = touch.pageY;
                            break;
                        case 'touchend':
                            // console.log('touchend');
                            swipeFunction.touches[event.type] = true;
                            if (swipeFunction.touches.touchstart.x > -1 && swipeFunction.touches.touchmove.x > -1) {
                                swipeFunction.touches.direction = swipeFunction.touches.touchstart.x < swipeFunction.touches.touchmove.x ? "right" : "left";
                                
                                // Continue here for previous and next button
                                // alert(touches.direction);
                                console.log(swipeFunction.touches.direction);
                            }
                        default:
                            break;
                    }
                }
            }
        },
        
        init: function() {
            console.log('init');
            var image = document.querySelector('.modal__images img');
            image.addEventListener('touchstart', swipeFunction.touchHandler, false); 
            image.addEventListener('touchmove', swipeFunction.touchHandler, false);  
            image.addEventListener('touchend', swipeFunction.touchHandler, false);
        }
    };
    
    console.log(swipeFunction);
    console.log(swipeFunction.init);
    swipeFunction.init(); 

} (window, window.THUNDERSTORM, window.jQuery));

