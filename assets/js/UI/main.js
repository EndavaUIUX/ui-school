/* ==========================================================================
 Aici se vor defini practic toate interactiunile intre module.
 rest cu localstorage, localstorage cu scriptul de generare, etc.
 ========================================================================== */

(function (window, THUNDERSTORM, $) {
    'use strict';
    var utility = THUNDERSTORM.modules.utility;
    var persistence = THUNDERSTORM.modules.persistence;
    var articlesParent = $('.main--homepage');
    var articleClickTriggers ='article h2, .article__title, .article-info img, .article__img img, .btn--more, .load-more';
    var loadMore = $('.load-more');
    var key = 'articles';

    //TODO add these to another module.
    THUNDERSTORM.modules.articles = {};
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
        THUNDERSTORM.modules.articles.data = persistence.get(key);
        //sets data in page like format
        THUNDERSTORM.modules.articles.pages =  utility.pagination(THUNDERSTORM.modules.articles.data);
        utility.generateArticles(THUNDERSTORM.modules.articles.pages[0], articlesParent, true);
        toggleLoadMore(loadMore.data('page'));
    } else {
        THUNDERSTORM.modules.API.get({
            url: 'rest/articles',
            callback: function (data) {
                persistence.set({
                    data: data[key],
                    sourcename: key
                });
                THUNDERSTORM.modules.articles.data = persistence.get(key);
                THUNDERSTORM.modules.articles.pages = utility.pagination(THUNDERSTORM.modules.articles.data);
                utility.generateArticles(THUNDERSTORM.modules.articles.pages[0], articlesParent, true);
                toggleLoadMore(loadMore.data('page'));
            }
        });
    }

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
        if (page < Object.keys(THUNDERSTORM.modules.articles.pages).length) {
            loadMore.data('page', page);
        } else {
            loadMore.hide('fast');
        }
    }

    loadMore.on('click', function (ev) {
        var page = $(this).data('page');
        utility.generateArticles(THUNDERSTORM.modules.articles.pages[page], articlesParent, false);
        page = page + 1;
        toggleLoadMore(page);
    });

}(window, window.THUNDERSTORM, window.jQuery));
