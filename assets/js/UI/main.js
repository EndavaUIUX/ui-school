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

    THUNDERSTORM.modules.articles.mostRecentArticles = persistence.get("latestArticlesAccessed");

    THUNDERSTORM.modules.articles.init({sourceName : key,  articlesParent : articlesParent, shouldGenerate : true, isMainPage : true, callback:    THUNDERSTORM.modules.articles.loadMode(articlesParent)});

    var recentArticles = THUNDERSTORM.modules.articles.mostRecentArticles;

  /* ==========================================================================
     Functions
     ========================================================================== */

   /* ==========================================================================
      Event listeners
      Set in local storage an object latest articles accessed with the key "latestArticlesAccessed",
      which contains the article index and a counter, representing the number of times an article was clicked.
      If the object is not in local storage, we create it, otherwise we replace the count property.
     ========================================================================== */

    utility.generateListHTML(recentArticles, THUNDERSTORM.modules.articles.data);

    articlesParent.on('click', articleClickTriggers, function (ev) {
        ev.stopPropagation();
        var articleIndex = $(ev.target).closest('article')[0].getAttribute('data-article-index');

        var found = false;
        if (recentArticles.length > 0) {

            for (var i = 0; i < recentArticles.length; i++){
                if (recentArticles[i].articleIndex === articleIndex) {

                    recentArticles.unshift(recentArticles[articleIndex]);

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

                THUNDERSTORM.modules.articles.mostRecentArticles["latestArticlesAccessed"] = recentArticles;

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
            })
        }

        //the actual redirect
        window.location.href = "/article?" + articleIndex;
    });
}(window, window.THUNDERSTORM));


