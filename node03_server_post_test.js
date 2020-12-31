var http = require('http');
var querystring = require('querystring');

var server = http.createServer(function(request, response){
	//post방식의 데이터가 서버로 전송되면 이벤트(data이벤트)를 이용하여 데이터를 저장한다.

	var postData ='';
	//request에 data이벤트가 발생하면 실행 - post방식으로 서버에 접속하면	
	request.on('data', function(data){
		postData += data;
	});
	
	//request에 post 접속시 data이벤트가 종료되면  end이벤트가 발생한다.
	request.on('end', function(){
		// postData에 있는 폼의 정보를 json으로 변경한다.
		var parseQuery = querystring.parse(postData);
		console.log(parseQuery);
		
		response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
		response.write('번호 : '+ parseQuery.num+'<br/>');
		response.write('이름 : '+ parseQuery.username+'<br/>');
		response.end('연락처 : '+ parseQuery.tel);		
	});	
});

server.listen(10004, function(){
	console.log('server start.....   http://localhost:10004');
});

