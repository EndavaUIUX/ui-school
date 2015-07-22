/* ==========================================================================
    Aici se vor defini practic toate interactiunile intre module.
    rest cu localstorage, localstorage cu scriptul de generare, etc.
   ========================================================================== */

(function (window, THUNDERSTORM) {
    'use strict';
    var utility = THUNDERSTORM.modules.utility;
    var persistence = THUNDERSTORM.modules.persistence;
/* ==========================================================================
   Verifica daca exista cheia articles in local storage. Daca da, preia datele
   de acolo.
   Daca nu, se apeleaza modulul de request la server care returneaza un json,
   salvat intr-un obiect public(sa poate fi vizibil din orice alta functie).
   ========================================================================== */
    var key = 'articles';
    
    if (utility.keyInLocalStorage(key)) {
        console.log('Key exists in local storage');
        THUNDERSTORM.articleData = persistence.get(key);
    } else {
        console.log('Key does not exist in local storage, will access Tatiana\'s send request module.');
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
    THUNDERSTORM.articleData.filter(function (item, index) {
      //console.log(item);
        utility.createArticle(THUNDERSTORM.articleData[index], index, 0);
    });
    console.log(utility.dateFormatter('30-03-2015'));
   
   
}(window, window.THUNDERSTORM));
