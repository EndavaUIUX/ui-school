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
    var listOfAccessedArticles = [];

    THUNDERSTORM.modules.articles.init({sourceName : key, articlesParent : articlesParent, shouldGenerate : true});  

/* ==========================================================================
   Event listeners
   ========================================================================== */

     function countArticlesAccessed() {
        var init = 0;

         return function () {
             init = init + 1;
         };
    }

    articlesParent.on('click', articleClickTriggers, function (ev) {
        ev.stopPropagation();
        var articleIndex = $(ev.target).closest('article')[0].getAttribute('data-article-index');

        listOfAccessedArticles.push(articleIndex);

        var localStorageArticlesAccessed = persistence.get("latestArticlesAccessed");

        if (localStorageArticlesAccessed.length > 0) {

            localStorageArticlesAccessed.push({
                articleIndex: articleIndex,
                count: countArticlesAccessed()
            });

            persistence.set({
                data: localStorageArticlesAccessed,
                sourceName: "latestArticlesAccessed"
            });

        } else {
            persistence.set({
                data: [{
                    articleIndex: articleIndex,
                    count: countArticlesAccessed()
                }],
                sourceName: "latestArticlesAccessed"
            })
        }

        //the actual redirect
        window.location.href = "/article?" + articleIndex;
    });

    function toggleLoadMore(page) {
        if (page < Object.keys(THUNDERSTORM.modules.articles.pages).length) {
            loadMore.data('page', page);
        } else {
            loadMore.hide('fast');
        }
    }

    loadMore.on('click', function (ev) {
        var page = $(this).data('page');
        //salvam index-ul paginii pe care vrem sa-l incarcam. Asta inseamna ca daca am nevoie de pagina x, o sa fie foarte usor sa o incarc.
        THUNDERSTORM.modules.articles.generateArticles(THUNDERSTORM.modules.articles.pages[page], articlesParent, false);
        page = page + 1;
        toggleLoadMore(page);
    });
}(window, window.THUNDERSTORM));
