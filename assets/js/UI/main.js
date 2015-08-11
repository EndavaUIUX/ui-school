/* ==========================================================================
 Aici se vor defini practic toate interactiunile intre module.
 rest cu localstorage, localstorage cu scriptul de generare, etc.
 ========================================================================== */

(function (window, THUNDERSTORM) {
    'use strict';
    var utility = THUNDERSTORM.modules.utility;
    var persistence = THUNDERSTORM.modules.persistence;
    var articlesParent = $('.main--homepage');
    var articleClickTriggers ='article h2, .article__title, .article-info img, .article__img img, .btn--more, .load-more, .latest__article .article__picture img' ;
    var loadMore = $('.load-more');
    var key = 'articles';
    var recentArticles;
    init();
    
  /* ==========================================================================
     Functions
     ========================================================================== */
    function init() {
        var resolutionPaginationObj = paginationOnResolution();

        
        THUNDERSTORM.modules.articles.mostRecentArticles = persistence.get("latestArticlesAccessed");
        THUNDERSTORM.modules.articles.init({
            sourceName : key,
            articlesParent : articlesParent,
            shouldGenerate : true,
            needRecent : resolutionPaginationObj.needRecent,
            callback:    THUNDERSTORM.modules.articles.loadMode(articlesParent),
            itemsPerPage : resolutionPaginationObj.itemsPerPage,
            showLoadMore : resolutionPaginationObj.showLoadMore
        });
        recentArticles = THUNDERSTORM.modules.articles.mostRecentArticles;
        utility.sortLatestArticlesAccessed(recentArticles);
    }

    function paginationOnResolution() {
        var deviceWidth = $(window).width();
        //if desktop and large tablet
        if (deviceWidth > 1200) {
            return {
                itemsPerPage : 7,
                needRecent : true,
                showLoadMore : true
            }
        } else
        //if tablet portrait and landscape
        if (deviceWidth > 700) {
            return {
                itemsPerPage : 5,
                needRecent : true,
                showLoadMore : true
            }
        }
        //if phone landscape
        if (deviceWidth > 600) {
            return {
                itemsPerPage : 3,
                needRecent : true,
                showLoadMore : true
            }
        }
        //if phone portrait and very small widths
        if (deviceWidth > 250) {
            return {
                itemsPerPage : 1,
                needRecent : false,
                showLoadMore : false
            }
        }
    }
    
   /* ==========================================================================
      Event listeners
      Set in local storage an object latest articles accessed with the key "latestArticlesAccessed",
      which contains the article index and a counter, representing the number of times an article was clicked.
      If the object is not in local storage, we create it, otherwise we replace the count property.
     ========================================================================== */

    articlesParent.on('click', articleClickTriggers, function (ev) {
        ev.stopPropagation();
        var articleIndex = $(ev.target).closest('article')[0].getAttribute('data-article-index');

        var found = false;
        if (recentArticles.length > 0) {
            for (var i = 0; i < recentArticles.length; i++){
                if (recentArticles[i].articleIndex === articleIndex) {
                    recentArticles[i].count += 1;

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
                    articleIndex: articleIndex,
                    count: 1
                });

                THUNDERSTORM.modules.articles.mostRecentArticles["latestArticlesAccessed"] = recentArticles;

                persistence.set({
                    data: recentArticles,
                    sourceName: "latestArticlesAccessed"
                });
            }

        } else {
            persistence.set({
                data: [{
                    articleIndex: articleIndex,
                    count: 1
                }],
                sourceName: "latestArticlesAccessed"
            })
        }

        //the actual redirect
        window.location.href = "/article?" + articleIndex;
    });

    $(window).resize(function () {
        utility.clearArticles();
        init();
    });
    $('img').on('dragstart', function(event) { event.preventDefault(); });

}(window, window.THUNDERSTORM));


