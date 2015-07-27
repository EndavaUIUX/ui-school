/* ==========================================================================
 Aici se vor defini practic toate interactiunile intre module.
 rest cu localstorage, localstorage cu scriptul de generare, etc.
 ========================================================================== */

(function (window, THUNDERSTORM, $) {
    'use strict';
    var utility = THUNDERSTORM.modules.utility;
    var persistence = THUNDERSTORM.modules.persistence;
    var articlesParent = $('.main');
    var articleClickTriggers ='article h2, .article__title, .article-info img, .article__img img, .btn--more, .load-more';
    var loadMore = $('.load-more');
    var key = 'articles';
    //TODO add these to another module.
    THUNDERSTORM.articleData = {};
    THUNDERSTORM.statistics = {};
    /* ==========================================================================
     Verifica daca exista cheia articles in local storage. Daca da, preia datele
     de acolo.
     Daca nu, se apeleaza modulul de request la server care returneaza un json,
     salvat intr-un obiect public(sa poate fi vizibil din orice alta functie).
     TODO handle single article page.
     ========================================================================== */


    if (utility.keyInLocalStorage(key)) {
        console.log('Key exists in local storage');

        THUNDERSTORM.articleData = persistence.get(key);
        //sets data in page like format
        THUNDERSTORM.pages =  utility.pagination(THUNDERSTORM.articleData);
        utility.generateArticles(THUNDERSTORM.pages[0], articlesParent);
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
                utility.generateArticles(THUNDERSTORM.pages[0], articlesParent);
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

    loadMore.on('click', function (ev) {
        var page = $(this).data('page');
        utility.generateArticles(THUNDERSTORM.pages[page], articlesParent);
        page = page + 1;
        if (page < Object.keys(THUNDERSTORM.pages).length) {
            $(this).data('page', page);
        } else{
            $(this).hide('fast');
        }

    });

}(window, window.THUNDERSTORM, window.jQuery));
