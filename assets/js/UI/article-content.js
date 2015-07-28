/**
 * Created by icojocaru on 7/27/2015.
 */

(function(window, THUNDERSTORM, $) {
    "use strict";
    var pageUrl = window.location.href,
        image = $("<img>"),
        articleUrlNumber = pageUrl.split("#")[1];
    THUNDERSTORM.modules.articles.init({sourceName : 'articles', shouldGenerate : false});  
    var article = THUNDERSTORM.modules.articles.data['articles'][articleUrlNumber];
    var viewMoreButton = $("<div></div>").html("View gallery").addClass("button__gallery");
    var  currentArticle = THUNDERSTORM.modules.utility.imageSourceGenerator(article);

    if(currentArticle.hasGallery == true){
        var currentGallery = image.attr("src", currentArticle.sources);

        $(".article__img").append(currentGallery);
        $(".article__img").append(viewMoreButton);

    } else {
        var currentGallery = image.attr("src", currentArticle.sources);
        $(".article__img").append(currentGallery);
    }
}(window, window.THUNDERSTORM, window.jQuery));