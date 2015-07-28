/**
 * Created by icojocaru on 7/27/2015.
 */

(function(window, THUNDERSTORM, $) {
    "use strict";
    var pageUrl = window.location.href,
        articleUrlNumber = pageUrl.split("#")[1],
        article = THUNDERSTORM.modules.articles.data[articleUrlNumber],
        viewMoreButton = $("<div></div>").html("View gallery"),
        currentArticle = THUNDERSTORM.modules.utility.imageSourceGenerator(article),
        image = $("<img>");

    if(currentArticle.hasGallery == true){
        var currentGallery = image.attr("src", currentArticle.sources);

        $(".article__img").append(currentGallery);
        $(".article__img").append(viewMoreButton);

    } else {
        var currentGallery = image.attr("src", currentArticle.sources);
        $(".article__img").append(currentGallery);
    }
}(window, window.THUNDERSTORM, window.jQuery));