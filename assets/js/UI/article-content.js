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
        utility = THUNDERSTORM.modules.utility,
        articleIndex = window.location.href.substr(window.location.href.indexOf("#") + 1),
        articleContent = THUNDERSTORM.modules.articles.data['articles'][articleIndex],
        articleBody = $(".article__body");

    if(currentArticle.hasGallery == true){
        var gallery;
        for(var index = 0; index < currentArticle.sources.length; index = index + 1){
            gallery = $("<img>").attr("src", currentArticle.sources[index]);
            $(".article__gallery").append(gallery);
            if(index != 0){
                gallery.addClass("hidden");
            }
        }
        $(".article__gallery").append(viewMoreButton);

    } else {
        gallery = $("<img>").attr("src", currentArticle.sources);
        $(".article__gallery").append(gallery);
    }

    utility.populateArticleDetails(articleContent, articleBody);

}(window, window.THUNDERSTORM, window.jQuery));