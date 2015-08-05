(function(){
    'use strict';
    var searchedWord =  window.location.href.split("?")[1],
        toLowerWord = searchedWord.toLowerCase(),
        key = 'articles',
        articlesParent = $('.content'),
        params = {"sourceName" : key, "articlesParent" : articlesParent, "searchedWord" : toLowerWord, isMainPage : false, "itemsPerPage" : 6};

    THUNDERSTORM.modules.articles.filterArticles(params);
    THUNDERSTORM.modules.articles.loadMode(articlesParent);

    /*$('.searchButton').click(function(e) {
        var inputValue = $('#search')[0].value,
            $errorElement = $('.search p');
        console.log(inputValue);
        utility.validateInput(inputValue, $errorElement);
    });*/


    $('#search').keypress(function(e) {
        var inputValue = $('#search')[0].value,
            $errorElement = $('.search p');

        if (e.keyCode == 13) {
            utility.validateInput(inputValue, $errorElement);
        }
    });

}());