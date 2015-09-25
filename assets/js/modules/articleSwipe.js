/*
* MIO: This is temporary and not used at this time.
*
function loadMoreLogic($selector) {
    var page = $('.load-more').data('page');
    var lastArticleIndex = $('.article-wrapper').last();
    lastArticleIndex = lastArticleIndex.find('article').data('articleIndex');
    lastArticleIndex = lastArticleIndex || 0;
    //salvam index-ul paginii pe care vrem sa-l incarcam. Asta inseamna ca daca am nevoie de pagina x, o sa fie foarte usor sa o incarc.
    THUNDERSTORM.modules.articles.generateArticles(THUNDERSTORM.modules.articles.pages[page], articlesParent, lastArticleIndex);
    page = page + 1;
    $selector.animate({left : 0}, 100);
}

function toggleLoadMore(page) {
    if (page < Object.keys(THUNDERSTORM.modules.articles.pages).length) {
        loadMore.data('page', page);
        return true;
    } else {
        loadMore.hide('fast');
        console.log('reached limit')
        return false;
    }
}

$(".main--homepage").on("swipeleft", '.latest__article, .article-wrapper', function () {
    var $this = $(this);
    $this.animate({left : '-200px'}, 200, function () {
        if ($this.next().length) {
            $this.hide();
            $this.next().css({left:0}).fadeIn();
        } else {
            if (toggleLoadMore($('.load-more').data('page'))) {
                loadMoreLogic($this);
            } else {
                $this.animate({left : 0}, 100);
            }
        }
    });
});

$(".main--homepage").on("swiperight", '.latest__article, .article-wrapper', function () {
    var $this = $(this);

    $this.animate({left : '200px'}, 200, function () {
        if ($this.prev().length) {
            $this.hide();
            $this.prev().css({left : 0}).fadeIn();
        } else {
            $this.animate({left : 0}, 100);
        }

    });
});
*/