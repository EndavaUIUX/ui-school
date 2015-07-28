/**
 * Created by icojocaru on 7/27/2015.
 */

(function(window, THUNDERSTORM, $) {

    var pageUrl = window.location.href,
        articleUrlNumber = pageUrl.split("#")[1];
    THUNDERSTORM.modules.articles.init({sourceName : 'articles', shouldGenerate : false});  
    var article = THUNDERSTORM.modules.articles.data['articles'][articleUrlNumber];
    var viewMoreButton = $("<div></div>").html("View gallery");
    var  currentArticle = THUNDERSTORM.modules.utility.imageSourceGenerator(article);

    if(currentArticle.hasGallery == true){
        $(".article__img").append(viewMoreButton);
    }
}(window, window.THUNDERSTORM, window.jQuery));