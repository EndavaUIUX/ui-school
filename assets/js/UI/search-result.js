(function(){
    'use strict';
    var searchedWord =  window.location.href.split("?")[1],
        toLowerWord = searchedWord.toLowerCase(),
        key = 'articles',
        params = {"sourceName" : key, "articlesParent" : $('.content'), "searchedWord" : toLowerWord, isMainPage : false, "itemsPerPage" : 6};

    THUNDERSTORM.modules.articles.filterArticles(params);
}());