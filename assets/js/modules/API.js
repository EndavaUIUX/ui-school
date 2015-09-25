(function (window, $, THUNDERSTORM) {
    'use strict';
    var THUNDERSTORM = THUNDERSTORM || {};
    THUNDERSTORM.modules = THUNDERSTORM.modules || {};
    var ServerData = {};
    var defaultAjaxOptions = {
        context: this,
        type: 'GET',
        dataType: 'json',
        error: defaultErrorHandler,
        beforeSend: function () {
            clearErrors();
        }
    };

    function defaultErrorHandler(err) {
        throw new Error('Ceva a mers prost..');
       // console.log('Ceva a mers prost', err.responseText);
    }

    function clearErrors() {
        console.log('Clearing errors...');
    }

    ServerData.get = function (options) {
        var ajaxOptions = {};
        var errorHandler = options.errorHandler || defaultErrorHandler;

        if (typeof options.callback !== 'function') {
            throw new Error('Callback type is not a function.');
        }

        $.ajax(options.url)
        .done(function (data) {
            options.callback.call(this, data);
        })
        .error(ajaxOptions.error);
    };

    THUNDERSTORM.modules.API = ServerData;
    window.THUNDERSTORM = THUNDERSTORM;

}(window, window.jQuery, window.THUNDERSTORM));