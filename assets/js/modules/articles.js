(function (window, THUNDERSTORM, $) {
    'use strict';
    var articles = {},
        utility = THUNDERSTORM.modules.utility,
        persistence = THUNDERSTORM.modules.persistence;
    articles.moduleName = "articles";
    
    articles.data = {};

    /* ==========================================================================
     function init()
     Verifica daca exista cheia articles in local storage. Daca da, preia datele
     de acolo.
     Daca nu, se apeleaza modulul de request la server care returneaza un json,
     salvat intr-un obiect public(sa poate fi vizibil din orice alta functie).
     options.shouldGenerate o sa genereze datele. In principiu asta e pentru homepage
     si eventual search page.
     options: {
      sourceName : 'articles',
      articlesParent : whatever,
      shouldGenerate : false
      id : id
     }
     ========================================================================== */
    
    articles.init = function (options) {
        var key = options.sourceName;
        if (utility.keyInLocalStorage(key)) {
            articles.data = persistence.get(options);
            if (options.shouldGenerate) {
                articles.pages = pagination(articles.data[key]);
                articles.generateArticles(articles.pages[0], options.articlesParent);
            }
        } else {
            THUNDERSTORM.modules.API.get({
                url: 'rest/articles',
                callback: function (data) {
                    persistence.set({
                        data: data,
                        sourceName: key
                    });
                    articles.data  = persistence.get(options);
                    if (options.shouldGenerate) {
                        articles.pages = pagination(articles.data[key]);
                        articles.generateArticles(articles.pages[0], options.articlesParent);
                    } 
                }
            });
        }
    };
    
    function createRecentArticle(articleData, articleIndex) {
        //TODO needs a simpler structure :(
        var base = $('<article></article>').addClass('latest__article').attr('data-article-index', articleIndex),
                articleContent = $('<div></div>').addClass('article__content'),
                articleTitle = $('<h2></h2>').addClass('article__title').html(articleData.title),
                articleHiddenImgContainer = $('<div></div>').addClass('article__picture'),
                articleHiddenImage = $('<img>'),
                articleVisibleImgTag = $('<img>'),
                articleVisibleImage = $('<div></div>').addClass('article__img'),
                articleInfo = $('<div></div>').addClass('article__informations'),
                articleText = $('<p>').addClass('article_description'),
                articleAction = $('<button></button>').addClass('btn btn--more').html('Read More'),
                articleAuthor = $('<span></span>').addClass('article__author article_info').html(articleData.author),
                articleDate = $('<span></span>').addClass('article__date article_info').html(utility.dateFormatter(articleData.published)),
                articleGallery,
                imageGalleryObj;
        imageGalleryObj = utility.imageSourceGenerator(articleData);
        articleHiddenImage.attr('src', imageGalleryObj.sources[0]);
        articleVisibleImgTag.attr('src', imageGalleryObj.sources[0]);
        articleText.html(articleData.description);
        /*append the elements*/
        articleInfo.append(articleAuthor);
        articleInfo.append(articleDate);
        if (imageGalleryObj.hasGallery) {
            articleGallery = $('<span></span>').addClass('article__gallery article_info').html('Photo Gallery');
            articleInfo.append(articleGallery);
        }
        articleContent.append(articleTitle);
        articleContent.append(articleInfo);
        articleHiddenImgContainer.append(articleHiddenImage);
        articleContent.append(articleHiddenImgContainer);
        articleContent.append(articleText);
        articleContent.append(articleAction);
        base.append(articleContent);
        articleVisibleImage.append(articleVisibleImgTag);
        base.append(articleVisibleImage);
        return base;
    }
    
    function pagination(data) {
        var pages = {},
          pageNr = 0,
          itemsPerPage = 7;
        data.filter(function (item, index) {
            if (!pages[pageNr]) {
                pages[pageNr] = [];
            }
            if (pages[pageNr].length < itemsPerPage) {
                pages[pageNr].push(item);
            } else {
                if (pageNr === 0) {
                    itemsPerPage = 6;
                }
                pageNr = pageNr + 1;
                pages[pageNr] = [];
                pages[pageNr].push(item);
            }
        });
        return pages;
    }
    
    articles.generateArticles = function (data, parent) {
        var myArticle,
            recentGenerated = false,
            i;
        for (i = 0; i < data.length; i = i + 1) {
            if (data.length === 7 && recentGenerated === false) {
                myArticle = utility.createRecentArticle(data[i], i);
                recentGenerated = true;
            } else {
                myArticle = utility.createArticle(data[i], i, 0);
            }
            parent.append(myArticle);
        }
    };
    
    articles.createArticle = function (articleData, articleIndex, isFullContent) {
        var base = $('<div></div>').addClass('article-wrapper'),
                article = $('<article></article>').attr('data-article-index', articleIndex),
                articleTitle = $('<h2></h2>').html(articleData.title),
                articleImage = $('<img>'),
                articleContent = $('<div></div>').addClass('article__content'),
                articleInfo = $('<div></div>').addClass('article-info'),
                articleText = $('<p>'),
                articleAction = $('<button></button>').addClass('btn btn--more').html('Read More'),
                articleAuthor = $('<span></span>').addClass('article-info__author article-info__pill').html(articleData.author),
                articleDate = $('<span></span>').addClass('article-info__date article-info__pill').html(utility.dateFormatter(articleData.published)),
                // articleGallery,
                 imageGalleryObj;
        imageGalleryObj = utility.imageSourceGenerator(articleData);
        articleImage.attr('src', imageGalleryObj.sources[0]);
        isFullContent ? articleText.html(articleData.content) : articleText.html(articleData.description);
        /*append the elements*/
        articleInfo.append(articleAuthor);
        articleInfo.append(articleDate);
        // if (imageGalleryObj.hasGallery) {
        //     articleGallery = $('<span></span>').addClass('article-info__gallery article-info__pill').html('Photo Gallery');
        //     articleInfo.append(articleGallery);
        // }
        articleInfo.append(articleImage);
        articleContent.append(articleInfo);
        article.append(articleTitle);
        article.append(articleContent);
        article.append(articleText);
        article.append(articleAction);
        base.append(article);
        return base;
    };

    THUNDERSTORM.modules.articles = articles;

}(window, window.THUNDERSTORM), window.jQuery);