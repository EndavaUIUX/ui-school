(function(){
    'use strict';
    var searchedWord =  window.location.href.split("?")[1],
        toLowerWord = searchedWord.toLowerCase(),
        key = 'articles',
        articlesParent = $('.content'),
        params = {"sourceName" : key, "articlesParent" : articlesParent, "searchedWord" : toLowerWord, isMainPage : false, "itemsPerPage" : 6};

    THUNDERSTORM.modules.articles.filterArticles(params);
    THUNDERSTORM.modules.articles.loadMode(articlesParent);

}());