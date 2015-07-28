/**
 * Created by icojocaru on 7/27/2015.
 */

(function(window, THUNDERSTORM, $) {

    var pageUrl = window.location.href,
        articleUrlNumber = pageUrl.split("#")[1],
        article = THUNDERSTORM.modules.articles.data[articleUrlNumber],
        viewMoreButton = $("<div></div>").html("View gallery"),
        currentArticle = THUNDERSTORM.modules.utility.imageSourceGenerator(article);

    if(currentArticle.hasGallery == true){
        $(".article__img").append(viewMoreButton);
    }
}(window, window.THUNDERSTORM, window.jQuery));