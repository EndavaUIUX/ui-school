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
        utility = THUNDERSTORM.modules.utility;

    if(!utility.validateURL(pageUrl, THUNDERSTORM.modules.articles.data['articles'])) {
        window.location.href="/";
        return;
    }

    var articleUrlNumber = pageUrl.split("#")[1],
        articleContent = $(".article__body"),
        viewMoreButton = $("<div></div>").html("View gallery").addClass("button__gallery"),
        article = THUNDERSTORM.modules.articles.data['articles'][articleUrlNumber],
        currentArticle = THUNDERSTORM.modules.utility.imageSourceGenerator(article),
        icoViewMore = $('<i></i>'),
        articleContent = $(".article__body"),
        titleContainer = $('.title'),
        infoAuthor = $('.article-informations__author'),
        infoDate = $('.article-informations__date'),
        elementsObject = {titleContainer : titleContainer, infoAuthor : infoAuthor, infoDate : infoDate};

        viewMoreButton.append(icoViewMore);

    if(currentArticle.hasGallery == true){
        var gallery;
        currentArticle.sources.filter(function(item, index){
            gallery = $("<img>").attr("src", item);
            $(".article__gallery").append(gallery);
            if(index != 0) gallery.addClass("hidden");
        });
        $(".article__gallery").append(viewMoreButton);

    } else {
        gallery = $("<img>").attr("src", currentArticle.sources);
        $(".article__gallery").append(gallery);
    }

    utility.populateArticleTitle(elementsObject, article);
    utility.populateArticleDetails(article, articleContent);

}(window, window.THUNDERSTORM, window.jQuery));