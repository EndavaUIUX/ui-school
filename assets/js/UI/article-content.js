
(function (window, THUNDERSTORM, $) {
    "use strict";
    THUNDERSTORM.modules.articles.init({
        sourceName: 'articles',
        shouldGenerate: false,
        callback: populateArticlePage
    });

    var persistence = THUNDERSTORM.modules.persistence;
    THUNDERSTORM.modules.articles.mostRecentArticles = persistence.get("latestArticlesAccessed");
    var recentArticles = THUNDERSTORM.modules.articles.mostRecentArticles,
    utility = THUNDERSTORM.modules.utility;

    utility.generateListHTML(recentArticles, THUNDERSTORM.modules.articles.data);

    function populateArticlePage() {
        var pageUrl = window.location.href,
            utility = THUNDERSTORM.modules.utility,
            articleUrlNumber = utility.validateURL(pageUrl, THUNDERSTORM.modules.articles.data['articles']),
            article = THUNDERSTORM.modules.articles.data['articles'][articleUrlNumber],
            currentArticle = utility.imageSourceGenerator(article),
            viewMoreButton = $("<a></a>").html("View gallery").addClass("button__gallery"),
            icoViewMore = $('<i></i>'),
            articleContent = $(".article__body"),
            titleContainer = $('.title'),
            infoAuthor = $('.article-informations__author'),
            infoDate = $('.article-informations__date'),
            elementsObject = {titleContainer: titleContainer, infoAuthor: infoAuthor, infoDate: infoDate};
        viewMoreButton.append(icoViewMore);

        if (currentArticle.hasGallery == true) {
            var gallery;
            currentArticle.sources.filter(function (item, index) {
                gallery = $("<img>").attr("src", item);
                $(".article__gallery").append(gallery);
                if (index != 0)
                    gallery.addClass("hidden");
            });
            $(".article__gallery").addClass("hasGallery");
            $(".article__gallery").append(viewMoreButton);

            //  populate gallery from article content with modal source url 
            var imagesHolder = $('.modal .modal__images');
            imagesHolder.html('');

            for (var i = 0; i < currentArticle.sources.length; i++) {
                var modalImage = $('<div></div>').addClass('modal__image'),

                        img = $('<img>').attr('src', currentArticle.sources[i]),
                        strippedUrl = utility.takeDomainUrl(currentArticle.sources[i]),
                        sourceUrl = $('<a></a>').addClass('modal__source').html(strippedUrl).attr('href', currentArticle.sources[i]);

                if (i !== 0) {
                    modalImage.hide();
                } else {
                    modalImage.append(img).append(sourceUrl);
                    imagesHolder.append(modalImage);
                }
            }

            // Get on screen image
            resizeModal();
        } else {
            gallery = $("<img>").attr("src", currentArticle.sources);
            $(".article__gallery").append(gallery);
        }


        utility.populateArticleTitle(elementsObject, article);
        utility.populateArticleDetails(article, articleContent);

        window.onload = function () {
            iterateGalleryPhotos(currentArticle, utility);
        };
    }



    var iterateGalleryPhotos = function(article, utility) {
        var indexURL =  [];
        for(var i = 0; i < article['sources'].length; i++ ) {
            indexURL.push(utility.takeDomainUrl(article['sources'][i]));
        }
        return indexURL;
    };

  function resizeModal() {
        var screenImage = $(".modal__image img");
        // Create new offscreen image to test
        var theImage = new Image();

        theImage.src = screenImage.attr("src");

        // Get accurate measurements from that.
        var imageWidth = theImage.width;
        var imageHeight = theImage.height;
        //$('.modal').css({'width' : (imageWidth+170) + 'px'});
        $('.modal').animate({
            height: (imageHeight) + 'px'
        }, 300);


    }

    /* ==========================================================================
     event handlers.                                                            
     ========================================================================== */

    $('body').on('click', function (ev) {
        var container = $('.modal');
        if (!container.is(ev.target) && container.has(ev.target).length === 0 && !$(ev.target).hasClass('.modal__close') && !$(ev.target).hasClass('button__gallery')) {
            THUNDERSTORM.modules.utility.dismissModal($('.modal'));
        }
    });

    $('.button__gallery').on('click', function (ev) {
        $('.modal__prev').hide();
        resetContainer();
        resetGallery();
        buttonGallery();
        THUNDERSTORM.modules.utility.showModal($('.modal'));

    });

    $('.modal__close').on('click', function (ev) {
        THUNDERSTORM.modules.utility.dismissModal($('.modal'));
        initializeContainer();
    });

    var swipeFunction = {
        touches: {
            "touchstart": {"x": -1, "y": -1},
            "touchmove": {"x": -1, "y": -1},
            "touchend": false,
            "direction": "undetermined"
        },
        touchHandler: function (event) {
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
                            if (swipeFunction.touches.direction == 'left') {
                                // debugger;
                                var imgIndex = document.querySelector('.modal__image'),
                                    $allGalleryImages = $(".article__gallery img");
                                imgIndex = parseInt(imgIndex.getAttribute('data-index'));
                                if (imgIndex+1 === $allGalleryImages.length ) {
                                    return false;
                                }
                                $('.modal__next').click();
                            } else {
                                 var imgIndex = document.querySelector('.modal__image'),
                                    $allGalleryImages = $(".article__gallery img");
                                imgIndex = parseInt(imgIndex.getAttribute('data-index'));
                                   
                                if (imgIndex === 0) {
                                    return false;
                                }
                                $('.modal__prev').click();
                            }
                    }
                }
            }
        },
        init: function () {
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


    /* ==========================================================================
     || Prev & Next // Buttons ||
     ========================================================================== */
    function buttonGallery() {
        var $allGalleryImages = $(".article__gallery img"),
            $imgGallery = $("div.modal__image img");
        $imgGallery[0].src = $allGalleryImages[0].src;
        $('.modal__image').attr('data-index', 0);
        resetGallery();
    }

    buttonGallery();
    function buttonNext() {
        $('.modal__next').on("click", function (ev) {
            var $allGalleryImages = $(".article__gallery img"),
                $imgGallery = $("div.modal__image img").css({display: 'none'}).fadeIn(1000),
                imgIndex = document.querySelector('.modal__image');
            imgIndex = parseInt(imgIndex.getAttribute('data-index'));
            var count = $allGalleryImages.length;
            $('.modal__prev').show();
            imgIndex = imgIndex + 1;
            if (imgIndex === count - 1) {
                // imgIndex = 0;
                $('.modal__next').hide();
            }
            $('.modal__image').attr('data-index', imgIndex);

            $imgGallery[0].src = $allGalleryImages[imgIndex].src;

            resizeModal();
        });
    }

    function buttonPrev() {
        $('.modal__prev').on("click", function (ev) {
            var $allGalleryImages = $(".article__gallery img"),
                $imgGallery = $("div.modal__image img").css({display: 'none'}).fadeIn(1000),
                imgIndex = document.querySelector('.modal__image');
            imgIndex = parseInt(imgIndex.getAttribute('data-index'));
            var count = $allGalleryImages.length;
            imgIndex = imgIndex - 1;
            if (imgIndex <= 0) {
                //imgIndex = count - 1;
                $('.modal__prev').hide();
            }
            $('.modal__next').show();
            //$('.modal__prev').show();
            $('.modal__image').attr('data-index', imgIndex);
            $imgGallery[0].src = $allGalleryImages[imgIndex].src;
            resizeModal();
        });

        /* ==========================================================================
         || End of Prev & Next // Buttons ||
         ========================================================================== */
    }

    function resetGallery() {
        $('.modal__prev').hide();
        $('.modal__next').show();
        $('.modal').css({height: 'auto'});
    }

    function resetContainer() {
        $('.container').css({position: 'fixed'});
    }

    function initializeContainer() {
        $('.container').css({position: 'static'});
    }

    buttonPrev();
    buttonNext();
    resetGallery();

}(window, window.THUNDERSTORM, window.jQuery));

 /* ==========================================================================
     || End of Prev & Next // Buttons ||
     ========================================================================== */




