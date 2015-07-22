function errorHandler() {
    console.log('error');
}

function test (response) {
    var returnData = "";
    
    for(var article = 0, len = response.articles.length; article < len; article++) {
        for(var property in response.articles[article]) {
            returnData = returnData + response.articles[article][property];
        }
    } 

    $(".main")[0].innerHTML = returnData; 
}

THUNDERSTORM.serverDataInstance = new THUNDERSTORM.modules.serverDataModule();
THUNDERSTORM.serverDataInstance.getServerData("http://localhost:3000/rest/articles/", "GET", "json", test, errorHandler);