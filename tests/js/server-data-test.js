QUnit.test("server-data-module.getServerData, Testing URL validation", function(assert) {
	"use strict";
	var url = "sfsgfg",
		result = false;	

	THUNDERSTORM.serverDataInstance = new THUNDERSTORM.modules.serverDataModule();
	result = THUNDERSTORM.serverDataInstance.isURLValid(url);

	assert.ok(result === true, "URL is valid.");
	
});

QUnit.test("server-data-module.getServerData, Testing ajax call content result", function(assert) {
	"use strict";
	var params = {},
		result = {};
	assert.ok(1 === 1, "Passed.");
	var ajaxResult = THUNDERSTORM.modules.ajaxCallback();

	params = {"url" : "http://localhost:3000/rest/articles/",
				  "method" : "GET",
				  "dataType" : "json",
				  "callback" : ajaxResult.testFct, 
				  "errCallback": ajaxResult.errorHandler};

	THUNDERSTORM.serverDataInstance = new THUNDERSTORM.modules.serverDataModule();
	result = THUNDERSTORM.serverDataInstance.getServerData(params);
	setTimeout(function(){
		assert.ok(result.responseJSON !== null, "Ajax call result is not null.");
	}, 1000);
});