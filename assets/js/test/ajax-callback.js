THUNDERSTORM = THUNDERSTORM || {};

THUNDERSTORM.modules.ajaxCallback = (function() {
	var errorHandler = function() {
		console.log('REQUEST ERROR');
	}

	var testFct = function(response) {
	    var returnData = "";
	    
	    for(var article = 0, len = response.articles.length; article < len; article++) {
	        for(var property in response.articles[article]) {
	            returnData = returnData + " " + response.articles[article][property];
	        }
	    } 
	    return returnData;
	}

	return {
		errorHandler : errorHandler,
		testFct : testFct
	}
});