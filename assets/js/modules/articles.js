(function (window, THUNDERSTORM, $) {
    'use strict';

    var articles = {},
        utility = THUNDERSTORM.modules.utility,
        persistence = THUNDERSTORM.modules.persistence,
        articlesParent = $('.main'),
        articleClickTriggers ='article h2, .article__title, .article-info img, .article__img img, .btn--more, .load-more, .article__photo, .latest__article .article__picture img, .latest__article .article__img',
        loadMore = $('.load-more');
    articles.moduleName = "articles";
    articles.data = {};

    /* =====================================================================
     function init()
     Verifica daca exista cheia articles in local storage. Daca da, preia datele
     de acolo.
     Daca nu, se apeleaza modulul de request la server care returneaza un json,
     salvat intr-un obiect public(sa poate fi vizibil din orice alta functie).
     options.shouldGenerate o sa genereze datele. In principiu asta e
     pentru homepage     si eventual search page.
     options: {
      sourceName : 'articles',
      articlesParent : whatever,
      shouldGenerate : false
      id : id
     }
     ==================================================================== */
    articles.init = function (options) {

        var key = options.sourceName;

        if (utility.keyInLocalStorage(key)) {
            articles.data = persistence.get(options);
            //if vrem sa generam, facem paginarea si generate
            if (options.shouldGenerate) {
                articles.pages = articles.pagination(articles.data[key], options.itemsPerPage);
                articles.generateArticles(articles.pages[0], options);
            }
            if (options.callback) {
                options.callback();
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
                        articles.pages = articles.pagination(articles.data[key], options.itemsPerPage);
                        articles.generateArticles(articles.pages[0], options);
                    }

                    if (options.callback) {
                        options.callback();
                    }
                }
            });
        }
        //yes, to refactor,just for testing purposes for now.
        if (options.showLoadMore) {
            $('.action').show();
            $('.load-more').show();
        } else {
            $('.action').hide();
            $('.load-more').hide();
        }
    };

    articles.filterArticles = function (options) {
        var searchedArticles = [];

        articles.data = persistence.get(options.sourceName);
        for(var i = 0, len = articles.data['articles'].length; i < len; i++) {
            if(articles.data['articles'][i]["title"].toLowerCase().indexOf(options.searchedWord) > -1){
                searchedArticles.push(articles.data['articles'][i]);
            }
        }
        return searchedArticles;
    };
    
    function createRecentArticle(articleData, articleIndex) {
        // TODO needs a simpler structure
        var base = $('<article></article>').addClass('latest__article').attr('data-article-index', articleIndex);
        var articleContent = $('<div></div>').addClass('article__content');
        var articleTitle = $('<h2></h2>').addClass('article__title').html(articleData.title);
        var articleHiddenImgContainer = $('<div></div>').addClass('article__picture');
        var articleHiddenImage = $('<img>');
        var articleVisibleImgTag = $('<img>');
        var articleVisibleImage = $('<div></div>').addClass('article__img');
        var articleInfo = $('<div></div>').addClass('article__informations');
        var articleText = $('<p>').addClass('article_description');
        var articleAction = $('<button></button>').addClass('btn btn--more').html('Read More');
        var articleAuthor = $('<span></span>').addClass('article__author article_info').html(articleData.author);
        var articleDate = $('<span></span>').addClass('article__date article_info').html(utility.dateFormatter(articleData.published));
        var articleGallery;
        var imageGalleryObj;
        var windowWidth = $(window).width();
        
        imageGalleryObj = utility.imageSourceGenerator(articleData);
        articleHiddenImage.attr('src', imageGalleryObj.sources[0]);
        articleVisibleImgTag.attr('src', imageGalleryObj.sources[0]);
        
        articleText.html(clipText(articleData.description, 400));
        
        /* append the elements */
        articleInfo.append(articleAuthor);
        articleInfo.append(articleDate);
        
        if (imageGalleryObj.hasGallery) {
            articleGallery = $('<a></a>').addClass('article__gallery article_info').html('Photo Gallery');
            articleInfo.append(articleGallery);
        }
        
        if (windowWidth < 400) {
            articleText = articleText.html(clipText(articleData.description, 118));
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

    //first page should be +1 bigger than the rest, as
    //it contains most recent article.
    articles.pagination = function (data, param) {
        var pages = {},
          pageNr = 0,
          itemsPerPage =  param || 7;
        data.filter(function (item, index) {
            if (!pages[pageNr]) {
                pages[pageNr] = [];
            }
            if (pages[pageNr].length < itemsPerPage) {
                pages[pageNr].push(item);
            } else {
                if (pageNr === 0) {
                    itemsPerPage = param - 1;
                }
                pageNr = pageNr + 1;
                pages[pageNr] = [];
                pages[pageNr].push(item);
            }
        });
        return pages;
    };
    
    function reduceText(text) {
      
    }

    function clipText(description, clipLimit) {
        var text;
        if (description.length > clipLimit) {
            text = description.substr(0, clipLimit);
            for (var i = text.length; i > 0; i = i - 1) {
                if (text[i] === " ") {
                    text = text.substr(0, i);
                    break;
                }
            }
            text = text.split(' ');
            text[text.length] = " ...";
            text = text.join(' ');
            return text;
        } else {
            text = description.substr(0, clipLimit);
        }
        return text;
    }
    
    articles.paginationOnResolution = function () {
        var deviceWidth = $(window).width();
        //if desktop and large tablet
        if (deviceWidth > 1200) {
            return {
                itemsPerPage : 7,
                needRecent : true,
                showLoadMore : true
            };
        } else
        //if tablet portrait and landscape
        if (deviceWidth > 700) {
            return {
                itemsPerPage : 5,
                needRecent : true,
                showLoadMore : false
            };
        }
        //if phone landscape
        if (deviceWidth > 600) {
            return {
                itemsPerPage : 3,
                needRecent : true,
                showLoadMore : false
            };
        }
        //if phone portrait and very small widths
        if (deviceWidth > 150) {
            return {
                itemsPerPage : 1,
                needRecent : false,
                showLoadMore : false
            };
        }
    };

    articles.createArticle = function (articleData, articleIndex, isFullContent) {
        var base = $('<div></div>').addClass('article-wrapper'),
                article = $('<article></article>').attr('data-article-index', articleIndex),
                articleTitle = $('<h2></h2>').html(clipText(articleData.title, 48)),
                articleImage = $('<img>'),
                articleContent = $('<div></div>').addClass('article__content'),
                articleInfo = $('<div></div>').addClass('article-info'),

                articlePhoto = $('<div></div>').addClass('article__photo'),
                articleText = $('<p>'),
                articleAction = $('<button></button>').addClass('btn btn--more').html('Read More'),
                articleAuthor = $('<span></span>').addClass('article-info__author article-info__pill').html(utility.nameFormatter(articleData.author, 1)),
                articleDate = $('<span></span>').addClass('article-info__date article-info__pill').html(utility.dateFormatter(articleData.published)),
                imageGalleryObj;

        imageGalleryObj = utility.imageSourceGenerator(articleData);
        articleImage.attr('src', imageGalleryObj.sources[0]);
        if (isFullContent) {
            articleText.html(articleData.content);
        } else {
            articleText.html(utility.clipText(articleData.description, 120));
        }
        
        /* append the elements */
        articleInfo.append(articleAuthor);
        articleInfo.append(articleDate);
        articleInfo.append(articlePhoto);
        articlePhoto.append(articleImage);

        articleContent.append(articleInfo);
        article.append(articleTitle);
        article.append(articleContent);
        article.append(articleText);
        article.append(articleAction);
        base.append(article);
        return base;
    };

    articles.generateArticles = function (data, options) {
        /*  MIO TODO needs refactor as it's very prone to errors
         *  plus jquery selector inside it..*/
        var myArticle,
            recentGenerated = false,
            i,
            additionIndex = options.carryIndex + 1 || 0;
            //+1 pentru ca i-ul porneste de la 0;
        var page = $('.load-more')[0].getAttribute('data-page');
        var $pageWrapper = $('<div></div>').addClass('article-page clearfix').attr('draggable', true);
        for (i = 0; i < data.length; i = i + 1) {
            if (data.length === options.itemsPerPage &&
                recentGenerated === false && options.needRecent === true) {
                myArticle = createRecentArticle(data[i], i + additionIndex);
                recentGenerated = true;
            } else {
                myArticle = articles.createArticle(data[i], i + additionIndex, 0);
            }
            $pageWrapper.append(myArticle);
        }
        options.articlesParent.append($pageWrapper);
        articles.toggleLoadMore(page);
    };
    
    articles.toggleLoadMore = function (page) {
        if (page < Object.keys(THUNDERSTORM.modules.articles.pages).length) {
            loadMore[0].setAttribute('data-page', page);
        } else {
            loadMore.hide('fast');
        }
    };

    THUNDERSTORM.modules.articles = articles;

}(window, window.THUNDERSTORM, window.jQuery));

