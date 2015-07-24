/* ==========================================================================
    Aici se vor defini practic toate interactiunile intre module.
    rest cu localstorage, localstorage cu scriptul de generare, etc.
   ========================================================================== */

(function (window, THUNDERSTORM, $) {
    'use strict';
    var utility = THUNDERSTORM.modules.utility;
    var persistence = THUNDERSTORM.modules.persistence;
    var articlesParent = $('.main');
    var articleClickTriggers = $('article h2, .article__title, .article-info img, .article__img img .btn--more');
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
        utility.generateArticles(THUNDERSTORM.articleData, articlesParent);
    } else {
        THUNDERSTORM.modules.API.get({
            url : 'rest/articles',
            callback : function (data) {
                persistence.set({
                    data : data[key],
                    sourcename : key
                });
                THUNDERSTORM.articleData = persistence.get(key);
                utility.generateArticles(THUNDERSTORM.articleData, articlesParent);
            }
        });
    }

    /*function mockDataInLs(){
         persistence.set({data:THUNDERSTORM.data[key], sourcename: key});
    }*/
    //mockDataInLs();
   
/* ==========================================================================
   Functie de generare a unui singur articol. Functie de generare articol
   custom?
   la generarea unui articol se are in vedere daca are galerie sau doar featured
   img.
   Fiecare readmore, title, imagine, vor avea un data-article-id, care va fi
   parsat cand se va da click pe ele, si se va adauga la url-ul target.
   Se genereaza maxim 7 articole, se retine cate article ai generate la un
   moment dat(public).
   ========================================================================== */
    

    
/* ==========================================================================
   Event listeners
   ========================================================================== */
    $('body').on('click', articlesParent, function (ev) {

        /*if ($(ev.target).is(articleClickTriggers)) {
            console.log('asdasdasd');
        }*/
        var articleIndex = $(ev.target).closest('article')[0].getAttribute('data-article-index');
        //the actual redirect
        window.location.href = "/article#" + articleIndex;
    });

   /* $('body').on('click', '.load-more', function () {
        console.log('test');
    });*/
   
}(window, window.THUNDERSTORM, window.jQuery));
