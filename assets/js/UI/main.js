/* ==========================================================================
 Aici se vor defini practic toate interactiunile intre module.
 rest cu localstorage, localstorage cu scriptul de generare, etc.
 ========================================================================== */

(function (window, THUNDERSTORM, $) {
    'use strict';
    var utility = THUNDERSTORM.modules.utility;
    var persistence = THUNDERSTORM.modules.persistence;
    var articles = THUNDERSTORM.modules.articles;
    var articlesParent = $('.main--homepage');
    var articleClickTriggers =  'article h2,' +
                                '.article__title,' +
                                '.article-info img,' +
                                '.article__img img,' +
                                '.btn--more,' +
                                '.load-more,' +
                                '.latest__article .article__picture img';
    var loadMore = $('.load-more');
    var page = loadMore[0].getAttribute('data-page');
    var key = 'articles';
    var recentArticles;

  /* ================================================================
     Functions

     ========================================================================== */

   /* ==========================================================================
      Event listeners
      Set in local storage an object latest articles accessed with the key "latestArticlesAccessed",
      which contains the article index and a counter, representing the number of times an article was clicked.
      If the object is not in local storage, we create it, otherwise we replace the count property.
     ========================================================================== */

    function init() {
        var resolutionPaginationObj = articles.paginationOnResolution();
        
        articles.mostRecentArticles = persistence.get("latestArticlesAccessed");
        articles.init({
            sourceName : key,
            articlesParent : articlesParent,
            shouldGenerate : true,
            needRecent : resolutionPaginationObj.needRecent,
            //callback:THUNDERSTORM.modules.articles.loadMode(articlesParent),
            itemsPerPage : resolutionPaginationObj.itemsPerPage,
            showLoadMore : resolutionPaginationObj.showLoadMore
        });
         recentArticles = articles.mostRecentArticles;
        utility.generateListHTML(recentArticles, THUNDERSTORM.modules.articles.data);
    }
    
  /* ================================================================
     Calls
     ==============================================================*/

    init();
    
  /* ================================================================
   * Event listeners Set in local storage an object latest articles
   * accessed with the key "latestArticlesAccessed", which contains
   * the article index and a counter, representing the number of
   * times an article was clicked.
   * If the object is not in local storage, we create it, otherwise
   * we replace the count property.
     ==============================================================*/

    articlesParent.on('click', articleClickTriggers, function (ev) {
        ev.stopPropagation();
        var articleIndex = $(ev.target).closest('article')[0].getAttribute('data-article-index');

        var found = false;
        if (recentArticles.length > 0) {

            for (var i = 0; i < recentArticles.length; i++){
                if (recentArticles[i].articleIndex === articleIndex) {
                    recentArticles.splice(i, 1);
                    var newObj = {articleIndex : articleIndex};
                    recentArticles.push(newObj);

                    persistence.set({
                        data: recentArticles,
                        sourceName: "latestArticlesAccessed"
                    });

                    found = true;
                    break;
                }
            }

            if (found === false) {
                recentArticles.push({
                    articleIndex: articleIndex
                });
                articles.mostRecentArticles.latestArticlesAccessed = recentArticles;

                persistence.set({
                    data: recentArticles,
                    sourceName: "latestArticlesAccessed"
                });
            }

        } else {
            persistence.set({
                data: [{
                    articleIndex: articleIndex
                }],
                sourceName: "latestArticlesAccessed"
            });
        }

        //the actual redirect
        window.location.href = "/article?" + articleIndex;
    });

    loadMore.on('click', function (ev) {
        var page = $(this)[0].getAttribute('data-page');
        var lastArticleIndex = $('.article-wrapper').last();
        lastArticleIndex = lastArticleIndex.find('article').data('articleIndex');
        lastArticleIndex = lastArticleIndex || 0;
        //salvam index-ul paginii pe care vrem sa-l incarcam. Asta inseamna ca daca
        //am nevoie de pagina x, o sa fie foarte usor sa o incarc.
        articles.generateArticles(articles.pages[page],
                                  {articlesParent : articlesParent,
                                  carryIndex : lastArticleIndex});
        page = parseInt(page, 10) + 1;
        articles.toggleLoadMore(page);
    });
    
    /*$(window).resize(function () {
        utility.clearArticles();
        loadMore[0].setAttribute('data-page', 1);
        init();
    });*/

    $('img').on('dragstart', function (event) { event.preventDefault(); });

}(window, window.THUNDERSTORM, window.jQuery));
