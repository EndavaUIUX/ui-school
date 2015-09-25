/*global describe, it, expect, jasmine, beforeEach, afterEach*/
(function () {
    describe("assets/js/API.js tests", function () {
        var api = window.THUNDERSTORM.modules.API;

        beforeEach(function () {
            jasmine.Ajax.install();
        });

        afterEach(function () {
            jasmine.Ajax.uninstall();
        });

        it("Should check if url is string", function () {
            var options = {
                url : 'rest/articles',
                callback : function () {}
            };

            api.get(options);
            expect(typeof(jasmine.Ajax.requests.mostRecent().url)).toBe('string');
        });

        it("Should execute callback after ajax request", function () {
            var doneFn = jasmine.createSpy('success'),
                options = {
                    url : 'rest/articles',
                    callback : doneFn
                };
            api.get(options);
            jasmine.Ajax.requests.mostRecent().respondWith({
                "status" : 200,
                "contentType" : 'text/plain',
                "responseText" : 'raspuns'
            });
            expect(doneFn).toHaveBeenCalledWith('raspuns');
        });

        it("Done should not be called when server returns not found", function () {
            var doneFn = jasmine.createSpy('success'),
                options = {
                    url : 'rest/articles',
                    callback : doneFn
                };
            api.get(options);
            jasmine.Ajax.requests.mostRecent().respondWith({
                "status" : 404,
                "contentType" : 'text/plain',
                "responseText" : 'raspuns'
            });
            expect(doneFn).not.toHaveBeenCalledWith();
        });

        it("Done should not be called when server returns bad request", function () {
            var doneFn = jasmine.createSpy('success'),
                options = {
                    url : 'rest/articles',
                    callback : doneFn
                };
            api.get(options);
            jasmine.Ajax.requests.mostRecent().respondWith({
                "status" : 401,
                "contentType" : 'text/plain',
                "responseText" : 'raspuns'
            });
            expect(doneFn).not.toHaveBeenCalledWith();
        });
    });
}());

