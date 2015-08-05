/* ==========================================================================
 Aici se vor defini practic toate interactiunile intre module.
 rest cu localstorage, localstorage cu scriptul de generare, etc.
 ========================================================================== */

(function (window, THUNDERSTORM) {
    'use strict';
    var utility = THUNDERSTORM.modules.utility;
    var persistence = THUNDERSTORM.modules.persistence;
    var articlesParent = $('.main--homepage');
    var articleClickTriggers ='article h2, .article__title, .article-info img, .article__img img, .btn--more, .load-more, .latest__article .article__picture img' ;
    var loadMore = $('.load-more');
    var key = 'articles';

    THUNDERSTORM.modules.articles.mostRecentArticles = persistence.get("latestArticlesAccessed");
    var recentArticles = THUNDERSTORM.modules.articles.mostRecentArticles;

    THUNDERSTORM.modules.articles.init({sourceName : key, articlesParent : articlesParent, shouldGenerate : true});

  /* ==========================================================================
     Functions
     ========================================================================== */
    
    function sortLatestArticlesAccessed (article) {
        var temp,
            found;

        do {
            found = false;
            for(var index = 0; index < article.length - 1; index++) {
                if(article[index].count < article[index + 1].count) {
                    temp = article[index].count;
                    article[index].count = article[index + 1].count;
                    article[index + 1].count = temp;
                    found = true;
                }
            }
        } while(found);

        return generateListHTML(article, THUNDERSTORM.modules.articles.data);
    }

    function generateListHTML (latestArticlesAccessed, allArticles) {
        var titleListParent = $("<ul></ul>");

        for(var i = 0; i < latestArticlesAccessed.length; i++) {
            if(latestArticlesAccessed[i].articleIndex < 10){
                var listItem = $("<li></li>"),
                    articleIndex = latestArticlesAccessed[i].articleIndex,
                    linkRedirect = $('<a></a>').attr("href", "article?" + latestArticlesAccessed[i].articleIndex);

                linkRedirect.html(allArticles["articles"][articleIndex].title);

                listItem.append(linkRedirect);
                titleListParent.append(listItem);
            }
        }
        //TODO: replace article's parent with right hand menu container
        articlesParent.append(titleListParent);
    }

    function toggleLoadMore(page) {
        if (page < Object.keys(THUNDERSTORM.modules.articles.pages).length) {
            loadMore.data('page', page);
        } else {
            loadMore.hide('fast');
        }
    }

    sortLatestArticlesAccessed(recentArticles);
   /* ==========================================================================
      Event listeners
      Set in local storage an object latest articles accessed with the key "latestArticlesAccessed",
      which contains the article index and a counter, representing the number of times an article was clicked.
      If the object is not in local storage, we create it, otherwise we replace the count property.
     ========================================================================== */

    articlesParent.on('click', articleClickTriggers, function (ev) {
        ev.stopPropagation();
        var articleIndex = $(ev.target).closest('article')[0].getAttribute('data-article-index');

        var found = false;
        if (recentArticles.length > 0) {
            for (var i = 0; i < recentArticles.length; i++){
                if (recentArticles[i].articleIndex === articleIndex) {
                    recentArticles[i].count += 1;

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
                    articleIndex: articleIndex,
                    count: 1
                });

                THUNDERSTORM.modules.articles.mostRecentArticles["latestArticlesAccessed"] = recentArticles;

                persistence.set({
                    data: recentArticles,
                    sourceName: "latestArticlesAccessed"
                });
            }

        } else {
            persistence.set({
                data: [{
                    articleIndex: articleIndex,
                    count: 1
                }],
                sourceName: "latestArticlesAccessed"
            })
        }

        //the actual redirect
        window.location.href = "/article?" + articleIndex;
    });

    loadMore.on('click', function (ev) {
        //cand load more, generate articles nu o sa stie care e indexul de unde sa continue cu generarea
        //acum se trimite si indexul ultimului articol generat.
        var page = $(this).data('page');
        var lastArticleIndex = $('.article-wrapper').last();
        lastArticleIndex = lastArticleIndex.find('article').data('articleIndex');
        lastArticleIndex = lastArticleIndex || 0;
        //salvam index-ul paginii pe care vrem sa-l incarcam. Asta inseamna ca daca am nevoie de pagina x, o sa fie foarte usor sa o incarc.
        THUNDERSTORM.modules.articles.generateArticles(THUNDERSTORM.modules.articles.pages[page], articlesParent, lastArticleIndex);
        page = page + 1;
        toggleLoadMore(page);
    });
}(window, window.THUNDERSTORM));
