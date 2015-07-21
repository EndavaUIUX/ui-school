SERVER_DATA = SERVER_DATA || {};

SERVER_DATA.serverDataModule = (function() {

	function ServerData() {}

	ServerData.prototype.getServerData = function(url, method, dataType) {
		$.ajax({  			
  			url: url,
  			method: method,
  			dataType: dataType
		})
		.done(function( msg ) {
		    console.log( "Data Saved: " + msg );
		});
	};

}());

SERVER_DATA.serverDataInstance = new SERVER_DATA.ServerData();