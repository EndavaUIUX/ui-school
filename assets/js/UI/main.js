/* ==========================================================================
 Aici se vor defini practic toate interactiunile intre module.
 rest cu localstorage, localstorage cu scriptul de generare, etc.
 ========================================================================== */

(function (window, THUNDERSTORM) {
    'use strict';
    var articlesParent = $('.main--homepage'),
        key = 'articles';
    
    THUNDERSTORM.modules.articles.init({sourceName : key,  articlesParent : articlesParent, shouldGenerate : true, isMainPage : true});
    THUNDERSTORM.modules.articles.loadMode(articlesParent);

}(window, window.THUNDERSTORM));
