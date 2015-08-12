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
    var recentArticles;
    var articleClickTriggers =  'article h2,' +
                                '.article__title,' +
                                '.article-info img,' +
                                '.article__img img,' +
                                '.btn--more,' +
                                '.load-more,' +
                                '.latest__article .article__picture img';
    init();
    
    articles.mostRecentArticles = persistence.get("latestArticlesAccessed");
    utility.generateListHTML(articles.mostRecentArticles, THUNDERSTORM.modules.articles.data);
    recentArticles = articles.mostRecentArticles;
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
        if (params.showLoadMore) {
            $('.action').show();
            $('.load-more').show();
        } else {
            $('.action').hide();
            $('.load-more').hide();
        }
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
  
  
    
  
  
   /* $(window).resize(function () {
        utility.clearArticles();
        loadMore[0].setAttribute('data-page', 1);
        init();
    });*/
}(window, window.jQuery, window.THUNDERSTORM));

