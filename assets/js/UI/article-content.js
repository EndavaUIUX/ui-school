/**
 * Created by icojocaru on 7/27/2015.
 */

(function(window, THUNDERSTORM, $) {
    "use strict";

    THUNDERSTORM.modules.articles.init({
        sourceName : 'articles',
        shouldGenerate : false
    });

    var pageUrl = window.location.href,
        articleUrlNumber = pageUrl.split("#")[1],
        article = THUNDERSTORM.modules.articles.data['articles'][articleUrlNumber],
        currentArticle = THUNDERSTORM.modules.utility.imageSourceGenerator(article),
        viewMoreButton = $("<div></div>").html("View gallery").addClass("button__gallery"),
        image = $("<img>");

    if(currentArticle.hasGallery == true){
        var currentGallery;
        for(var index = 0; index < currentArticle.sources.length; index++){
            currentGallery = image.attr("src", currentArticle.sources[index]);
            $(".article__img").append(currentGallery);
        }
        $(".article__img").append(viewMoreButton);

    } else {
        var currentGallery = image.attr("src", currentArticle.sources);
        $(".article__img").append(currentGallery);
    }
}(window, window.THUNDERSTORM, window.jQuery));