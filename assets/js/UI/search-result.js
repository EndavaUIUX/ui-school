(function(){
    'use strict';
    var searchedWord =  window.location.href.split("?")[1],
        toLowerWord = searchedWord.toLowerCase(),
        key = 'articles',
        articlesParent = $('.content'),
        params = {"sourceName" : key, "articlesParent" : articlesParent, "searchedWord" : toLowerWord, isMainPage : false, "itemsPerPage" : 6},
        searchedArticles = THUNDERSTORM.modules.articles.filterArticles(params),
        articles = THUNDERSTORM.modules.articles;

    articles.pages = articles.pagination( searchedArticles, params.itemsPerPage);
    articles.generateArticles(articles.pages[0], params.articlesParent);
    articles.loadMode(articlesParent);

    var persistence = THUNDERSTORM.modules.persistence;
    THUNDERSTORM.modules.articles.mostRecentArticles = persistence.get("latestArticlesAccessed");
    var recentArticles = THUNDERSTORM.modules.articles.mostRecentArticles,
        utility = THUNDERSTORM.modules.utility;

    utility.sortLatestArticlesAccessed(recentArticles);
     utility.collapseRecentArticleMenu();
}());
