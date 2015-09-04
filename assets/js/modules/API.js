(function (window, $, THUNDERSTORM) {
			'use strict';	
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
				throw new Error('Ceva a mers prost..', err);
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
				ajaxOptions = $.extend(ajaxOptions, options);
				$.ajax(ajaxOptions)
						.done(options.callback)
						.error(errorHandler);				
			};
			window.THUNDERSTORM.modules.API = ServerData;
			
}(window, window.jQuery, window.THUNDERSTORM));