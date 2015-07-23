THUNDERSTORM = THUNDERSTORM || {};

THUNDERSTORM.modules.serverDataModule = (function() {
	'use strict';

	function ServerData() {}	

	ServerData.prototype.getServerData = function(params) {	
		var response = {};

		if(!params || typeof params !== "object" || !this.isURLValid(params.url)){
			throw new Error("Params missing.");
		}

		var ajaxCall = $.ajax({  			
  			url: params.url,
  			method: params.method,
			dataType: params.dataType
		});

		response = ajaxCall.done(params.callback);
		ajaxCall.error(params.errCallback);	
		return 	response;		
	};

	ServerData.prototype.isURLValid = function(str) {
		var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regexp.test(str);
	}

	return ServerData;

}());