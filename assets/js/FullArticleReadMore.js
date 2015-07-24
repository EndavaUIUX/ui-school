/* ==========================================================================
 Functie de generare a unui singur articol pe o noua pagina.
 Fiecare button Read More va face redirect pe pagina respectiva in care
 toate datele vor fi generate in mod automat,
 title, imagine, vor avea un data-article-id, care va fi
 parsat cand se va da click pe ele, si se va adauga la url-ul target.
 Se genereaza un singur articol pe pagina.(FullContent)
 ========================================================================== */

//Task asignat de Alex, vorbiti cu el !


//utility.createArticle = function (articleData, articleIndex, isFullContent) {
//    var base = $('<div></div>').addClass('article-wrapper'),
//            article = $('<article></article>').attr('data-article-index', articleIndex),
//            articleTitle = $('<h2></h2>').html(articleData.title),
//            articleImage = $('<img>').css('height', 182),
//            articleContent = $('<div></div>').addClass('article__content'),
//            articleInfo = $('<div></div>').addClass('article-info'),
//            articleText = $('<p>'),
//            articleAction = $('<button></button>').addClass('btn btn--more').html('Read More'),
//            articleAuthor = $('<span></span>').addClass('article-info__author article-info__pill').html(articleData.author),
//            articleDate = $('<span></span>').addClass('article-info__date article-info__pill').html(utility.dateFormatter(articleData.published)),
//            articleGallery,
//            imageGalleryObj;
//
//    imageGalleryObj = utility.imageSourceGenerator(articleData);
//    articleImage.attr('src', imageGalleryObj.sources[0]);
//    isFullContent ? articleText.html(articleData.content) : articleText.html(articleData.description);
//    /*append the elements*/
//    articleInfo.append(articleAuthor);
//    articleInfo.append(articleDate);
//
//    if (imageGalleryObj.hasGallery) {
//        articleGallery = $('<span></span>').addClass('article-info__gallery article-info__pill').html('Photo Gallery');
//        articleInfo.append(articleGallery);
//    }
//    articleInfo.append(articleImage);
//    articleContent.append(articleInfo);
//    article.append(articleTitle);
//    article.append(articleContent);
//    article.append(articleText);
//    article.append(articleAction);
//    base.append(article);
//    return base;
//};