THUNDERSTORM = THUNDERSTORM || {};

THUNDERSTORM.modules.serverDataModule = (function() {
	'use strict';

	function ServerData() {}

	ServerData.prototype.getServerData = function(url, method, dataType, callback, errCallback) {

		$.ajax({  			
  			url: url,
  			method: method,
			dataType: dataType
		})
		.done(callback)
		.error(errCallback);				
	};

	return ServerData;

}());