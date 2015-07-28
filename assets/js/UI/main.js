/* ==========================================================================
 Aici se vor defini practic toate interactiunile intre module.
 rest cu localstorage, localstorage cu scriptul de generare, etc.
 ========================================================================== */

(function (window, THUNDERSTORM) {
    'use strict';
    var utility = THUNDERSTORM.modules.utility;
    var persistence = THUNDERSTORM.modules.persistence;
    var articlesParent = $('.main--homepage');
    var articleClickTriggers ='article h2, .article__title, .article-info img, .article__img img, .btn--more, .load-more';
    var loadMore = $('.load-more');
    var key = 'articles';
    
    THUNDERSTORM.modules.articles.init({sourceName : key, articlesParent : articlesParent, shouldGenerate : true});  

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
        //salvam index-ul paginii pe care vrem sa-l incarcam. Asta inseamna ca daca am nevoie de pagina x, o sa fie foarte usor sa o incarc.
        //TODO, daca ai mai putin de 7 articole pe prima pagina, load more-ul o sa ramane vizibil.
        THUNDERSTORM.modules.articles.generateArticles(THUNDERSTORM.modules.articles.pages[page], articlesParent, false);
        page = page + 1;
        toggleLoadMore(page);
    });

}(window, window.THUNDERSTORM));
