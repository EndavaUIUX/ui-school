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

    THUNDERSTORM.modules.articles.mostRecentArticles = {};
    THUNDERSTORM.modules.articles.init({sourceName : key, articlesParent : articlesParent, shouldGenerate : true});

/* ==========================================================================
   Event listeners
   ========================================================================== */

    //update la THUNDERSTORM.modules.articles.mostRecent

    articlesParent.on('click', articleClickTriggers, function (ev) {
        ev.stopPropagation();
        var articleIndex = $(ev.target).closest('article')[0].getAttribute('data-article-index');

        listOfAccessedArticles.push(articleIndex);

        var localStorageArticlesAccessed = persistence.get("latestArticlesAccessed");

        var found = false;
        if (localStorageArticlesAccessed.length > 0) {
            for (var i = 0; i < localStorageArticlesAccessed.length; i++){
                if (localStorageArticlesAccessed[i].articleIndex === articleIndex) {
                    localStorageArticlesAccessed[i].count += 1;

                    THUNDERSTORM.modules.articles.mostRecentArticles["latestArticlesAccessed"] = localStorageArticlesAccessed;

                    persistence.set({
                        data: localStorageArticlesAccessed,
                        sourceName: "latestArticlesAccessed"
                    });

                    found = true;
                    break;
                }
            }

            if (found === false) {
                localStorageArticlesAccessed.push({
                    articleIndex: articleIndex,
                    count: 1
                });

                THUNDERSTORM.modules.articles.mostRecentArticles["latestArticlesAccessed"] = localStorageArticlesAccessed;

                persistence.set({
                    data: localStorageArticlesAccessed,
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

        
        sortArticlesAccessed(localStorageArticlesAccessed);

        //the actual redirect
        window.location.href = "/article?" + articleIndex;

    });

    function sortArticlesAccessed (latestArticlesAccessed) {
           var temp,
            found;

        do {
            found = false;
            for(var index = 0; index < latestArticlesAccessed.length - 1; index++) {
                if(latestArticlesAccessed[index].count < latestArticlesAccessed[index + 1].count) {
                    temp = latestArticlesAccessed[index].count;
                    latestArticlesAccessed[index].count = latestArticlesAccessed[index + 1].count;
                    latestArticlesAccessed[index + 1].count = temp;
                    found = true;
                }
            }
        } while(found);

        return latestArticlesAccessed;
    }

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
