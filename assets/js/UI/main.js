/* ==========================================================================
 Aici se vor defini practic toate interactiunile intre module.
 rest cu localstorage, localstorage cu scriptul de generare, etc.
 ========================================================================== */

(function (window, THUNDERSTORM, $) {
    'use strict';
    var utility = THUNDERSTORM.modules.utility;
    var persistence = THUNDERSTORM.modules.persistence;
    var articles = THUNDERSTORM.modules.articles;
    var articlesParent = $('.main--homepage');
    var articleClickTriggers =  'article h2,' +
                                '.article__title,' +
                                '.article-info img,' +
                                '.article__img img,' +
                                '.btn--more,' +
                                '.load-more,' +
                                '.latest__article .article__picture img';
    var loadMore = $('.load-more');
    var page = loadMore[0].getAttribute('data-page');
    var key = 'articles';
    var recentArticles;
    var articlePages = '.article-page';

    //utility.sortLatestArticlesAccessed(recentArticles);
  /* ================================================================
     Functions

     ========================================================================== */

   /* ==========================================================================
      Event listeners
      Set in local storage an object latest articles accessed with the key "latestArticlesAccessed",
      which contains the article index and a counter, representing the number of times an article was clicked.
      If the object is not in local storage, we create it, otherwise we replace the count property.
     ========================================================================== */

    function init() {
        var resolutionPaginationObj = articles.paginationOnResolution();
        if ($(window).width() > 600 && $(window).width() < 700) {
            $('html, body').animate({
                 scrollTop: articlesParent.offset().top -90
             }, 200);
        }

        articles.init({
            sourceName : key,
            articlesParent : articlesParent,
            shouldGenerate : true,
            needRecent : resolutionPaginationObj.needRecent,
            //callback:THUNDERSTORM.modules.articles.loadMode(articlesParent),
            itemsPerPage : resolutionPaginationObj.itemsPerPage,
            showLoadMore : resolutionPaginationObj.showLoadMore
        });
    }
    
  /* ================================================================
     Calls
     ==============================================================*/

    init();
    
    articles.mostRecentArticles = persistence.get("latestArticlesAccessed");
    recentArticles = articles.mostRecentArticles;
    utility.generateListHTML(recentArticles, THUNDERSTORM.modules.articles.data);
  /* ================================================================
   * Event listeners Set in local storage an object latest articles
   * accessed with the key "latestArticlesAccessed", which contains
   * the article index and a counter, representing the number of
   * times an article was clicked.
   * If the object is not in local storage, we create it, otherwise
   * we replace the count property.
     ==============================================================*/
    
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

    function loadNextPage() {
        var page = loadMore[0].getAttribute('data-page');
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
    }
    
    loadMore.on('click', function (ev) {
        loadNextPage();
    });

    articlesParent.on('swipe dragstart', articlePages, function (e, Dx, Dy) {
        var $this = $(this);
        var generatedPages = $('.article-page').length;
        var parentPage = $(e.target).closest(articlePages);
        var emptyBounce = $(window).width() / 2;
// the ammount to go to left or right if we don't have
// any more articles on left or right.
        if (Dx < 0) {
            console.log('swipe was done to the left, so next article should show from the right');
            // if we haven't generated everything yet we need to loadNextPage,
            // otherwise we need to show the next hidden element.
            if (generatedPages < Object.keys(articles.pages).length && $this.next().length === 0) {
                parentPage.animate({left : '-1200px'}, 200, function () {
                    parentPage.css({'display' : 'none'});
                    loadNextPage();
                    parentPage.next().css({left: '1200px'});
                    parentPage.next().animate({left : '0px'}, 200);
                });
            } else {
                if (parentPage.next().length) {
                 //if we have a hiden article after the current visible one.
                 //show it and animate it from left, at the end, hide current.
                    parentPage.next().show();
                    parentPage.animate({left : '-1200px'}, 200, function () {
                        parentPage.css({'display' : 'none'});
                        parentPage.next().css({left: '1200px'});
                        parentPage.next().animate({left : '0px'}, 200);
                    });
                } else {
                //if we're at the end of the article group, animate
                //it slightly.
                    parentPage.animate({left : '-' + emptyBounce + 'px'}, 200, function () {
                            parentPage.animate({left : 0}, 100);
                        });
                }
            }
        }
        if (Dx === 0) {
            return;
        }
        if (Dx > 0) {
            console.log('swipe was done to the right, so next article should show from the left(if any)');
            if ($this.prev().length) {
                //parentPage.prev().show();
                parentPage.animate({left : '1200px'}, 200, function () {
                    parentPage.css({'display' : 'none'});
                    //parentPage.prev().css({left: '-800px'});
                    parentPage.prev().show();
                    parentPage.prev().animate({left : '0px'}, 200);
                });
                
                //$this.hide();
               // $this.prev().css({left : 0}).fadeIn();
            } else {
                parentPage.animate({left : emptyBounce + 'px'}, 200, function () {
                            parentPage.animate({left : 0}, 100);
                        });
            }
        }
        $('html, body').animate({
             scrollTop: articlesParent.offset().top -80
         }, 200);
    });
    
    $(window).on('orientationchange', function () {
            setTimeout(function () {
                utility.clearArticles();
                loadMore[0].setAttribute('data-page', 1);
                init();
            }, 200);
            $('html, body').animate({
                 scrollTop: articlesParent.offset().top +50
             }, 200);
    });

   /* window.addEventListener("orientationchange", function() {
            utility.clearArticles();
            loadMore[0].setAttribute('data-page', 1);
            init();
            alert('test');
    }, false);*/

   /*$('img').on('dragstart', function (event) { event.preventDefault(); });*/

}(window, window.THUNDERSTORM, window.jQuery));
