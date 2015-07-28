QUnit.test("server-data-module.getServerData, Testing ajax call content result", function(assert) {
	"use strict";
	var params = {},
		result = {},
		ajaxResult = THUNDERSTORM.modules.ajaxCallback();

	assert.ok(1 === 1, "Passed.");
	
	params = {"url" : "http://localhost:3000/rest/articles/",
			  "callback" : ajaxResult.testFct, 
			  "errCallback": ajaxResult.errorHandler};

	result = THUNDERSTORM.modules.API.get(params);

	setTimeout(function(){
		assert.ok(result.responseJSON !== null, "Ajax call result is not null.");
	}, 1000);
});