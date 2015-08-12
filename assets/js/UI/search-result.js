/* =====================================================================
 * Search module. TODO: document it better.
 ==================================================================== */
(function (window, $, THUNDERSTORM) {
    'use strict';
    var searchedWord =  window.location.href.split("?")[1].toLowerCase();
    var key = 'articles';
    var articlesParent = $('.content');
    var articles = THUNDERSTORM.modules.articles;
    var persistence = THUNDERSTORM.modules.persistence;
    var utility = THUNDERSTORM.modules.utility;
    var loadMore = $('.load-more');

    init();
    
    articles.mostRecentArticles = persistence.get("latestArticlesAccessed");

   // utility.sortLatestArticlesAccessed(articles.mostRecentArticles);
    utility.generateListHTML(articles.mostRecentArticles, THUNDERSTORM.modules.articles.data);
    
    /* =====================================================================
     * Functions.
     * function callback(). Need to define it here so as to
     * pass a parameter to filter articles and to params object.
     ==================================================================== */

    function init() {
        /*  TODO: To be fair, resolution obj should not be called here
         *  as its somewhat of an internal object to init
         *  */
        var resolutionPaginationObj = articles.paginationOnResolution();
        var params = {  "sourceName" : key,
                        "articlesParent" : articlesParent,
                        "needRecent" : resolutionPaginationObj.needRecent,
                        "shouldGenerate" : true,
                        "searchedWord" : searchedWord,
                        "itemsPerPage" : resolutionPaginationObj.itemsPerPage,
                        "showLoadMore" : resolutionPaginationObj.showLoadMore};

    // utility.collapseRecentArticleMenu();

        articles.pages = articles.pagination(articles.filterArticles(params), params.itemsPerPage);
        articles.generateArticles(articles.pages[0], params);
}

    /* =====================================================================
     * Events.
     ==================================================================== */
    
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
    
    $(window).resize(function () {
        utility.clearArticles();
        loadMore[0].setAttribute('data-page', 1);
        init();
    });
}(window, window.jQuery, window.THUNDERSTORM));

