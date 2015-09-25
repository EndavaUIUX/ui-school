/*global describe, it, expect, jasmine, beforeEach, afterEach, spyOn*/
(function ($) {

    var storage = (function () {
        var store = {};
        return {
            getItem: function (key) {
                return store[key];
            },
            setItem: function (key, value) {
                store[key] = value.toString();
            },
            clear: function () {
                store = {};
            }
        };
    })();

    describe("assets/js/utility.js tests", function () {
        var utility = window.THUNDERSTORM.modules.utility;

        it("It should clear the contents of a container", function () {
            var $container = $('<div></div>');
            $container.append($('<h1></h1>'));
            $container.append($('<span></span>'));
            $container.append($('<span></span>'));
            utility.clearArticles($container);
            expect($container.children().length).toBe(0);
        });

        it("It shouldn't find the key in localstorage", function () {
            var key = 'articles';
            expect(utility.keyInLocalStorage(key, storage)).toBe(false);
        });

        it("It should find the key in localstorage", function () {
            var key = 'articles';
            storage.setItem(key, 'asdasdasdasdasdasd');
            expect(utility.keyInLocalStorage(key, storage)).toBe(true);
        });

        it("It should format data from format : //dd mm yyyy//", function () {
            var date = '12-12-1990';
            expect(utility.dateFormatter(date, true)).toBe('December 12th, 1990');
            date = '12.12.1990';
            expect(utility.dateFormatter(date, true)).toBe('December 12th, 1990');
            expect(utility.dateFormatter(date, false)).toBe('December 12th');
        });

        it("It should format name", function () {
            expect(typeof utility.nameFormatter('Marius Ionescu')).toBe('object');
            expect(typeof utility.nameFormatter('Marius Ionescu', true)).toBe('string');
            expect(utility.nameFormatter('John Fitzgerald Kenedy', true)).toBe('John F. K. ');
        });
        
        it("It should populate article details", function () {
          var container = $('<div></div>');
          var content = $('<p></p>');
          content.text('Lorem ipsum dolor sit amet');
          utility.populateArticleDetails(content, container);
          expect(container.length).toBe(1);
        });

    });

}(window.jQuery));