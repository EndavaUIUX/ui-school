(function (window, THUNDERSTORM) {
    'use strict';
    var articles = {},
        utility = THUNDERSTORM.modules.utility,
        persistence = THUNDERSTORM.modules.persistence,
        key = 'articles';
    articles.moduleName = "articles";
    
    articles.data = {};

    /* ==========================================================================
     Verifica daca exista cheia articles in local storage. Daca da, preia datele
     de acolo.
     Daca nu, se apeleaza modulul de request la server care returneaza un json,
     salvat intr-un obiect public(sa poate fi vizibil din orice alta functie).
     MIO: TODO handle single article page.
     MIO: TODO simplify some of the bellow
     ========================================================================== */

    if (utility.keyInLocalStorage(key)) {
        console.log('Key exists in local storage');
        THUNDERSTORM.articleData = persistence.get(key);
        //sets data in page like format
        THUNDERSTORM.pages =  utility.pagination(THUNDERSTORM.articleData);
        utility.generateArticles(THUNDERSTORM.pages[0], articlesParent, true);
        toggleLoadMore(loadMore.data('page'));
    } else {
        THUNDERSTORM.modules.API.get({
            url: 'rest/articles',
            callback: function (data) {
                persistence.set({
                    data: data[key],
                    sourcename: key
                });
                THUNDERSTORM.articleData = persistence.get(key);
                utility.pagination(THUNDERSTORM.articleData);
                utility.generateArticles(THUNDERSTORM.pages[0], articlesParent, true);
                toggleLoadMore(loadMore.data('page'));
            }
        });
    }

    /*function mockDataInLs(){
     persistence.set({data:THUNDERSTORM.data[key], sourcename: key});
     }*/
    //mockDataInLs();

/* ==========================================================================
   Event listeners
   ========================================================================== */
    articlesParent.on('click', articleClickTriggers, function (ev) {
        ev.stopPropagation();
        var articleIndex = $(ev.target).closest('article')[0].getAttribute('data-article-index');
        //the actual redirect
        window.location.href = "/article#" + articleIndex;
    });

    function toggleLoadMore(page) {
        if (page < Object.keys(THUNDERSTORM.pages).length) {
            loadMore.data('page', page);
        } else {
            loadMore.hide('fast');
        }
    }

    loadMore.on('click', function (ev) {
        var page = $(this).data('page');
        utility.generateArticles(THUNDERSTORM.pages[page], articlesParent, false);
        page = page + 1;
        toggleLoadMore(page);
    });
    
    THUNDERSTORM.modules[articles.moduleName] = articles;
}(window, window.THUNDERSTORM));