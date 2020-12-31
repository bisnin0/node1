var http= require('http');
var url = require('url');
var fs = require('fs');
var mime = require('mime');

var server = http.createServer(function(request, response){
	// request에서 url을 파싱하여야 접속주소를 알아낸다.
	var parseUrl = url.parse(request.url);  
	
	//접속주소를 알아낸다.   http://localhost:10009/home
	var pathName = parseUrl.pathname;
	console.log("pathName===> "+ pathName);
	
	if(pathName=='/home'){//html파일을 요구
		// html파일을 read하여 response에 쓰기를 한다.
		//          파일명, 인코딩, 콜백함수
		fs.readFile(__dirname+'/node10_html_image.html', 'utf-8', function(error, data){
			if(!error){   //   error   --> 에러발생 (true)        error ->  에러안발생(false)
				//쓰기 : 파일에 정상적으로 읽기를 했을때
				response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
				response.end(data);
			}else{
				response.writeHead(500, {"Content-Type":"text/html"});
				response.end("500 Error......");
				
			}
		});		
	}else if(pathName.indexOf("/images")==0){//images폴더명으로 요청이 들어모면
	    var imgPath = pathName.substring(1);  //    /images/2.png    --->  images/2.png
		//mime : 파일의 종류        /images/2.png
		var imgMime = mime.lookup(imgPath);
		console.log("mime-->" + imgMime);
		fs.readFile(imgPath, function(error, data){
			if(error){//에러일때
				
			}else{//에러아닐때
				response.writeHead(200, {"Content-Type":imgMime});
				response.end(data);
			}
		});
		
	}else{
		response.writeHead(404, {"Content-Type":"text/html"});
		response.end("404 Page Not Found......");
	}	
});

server.listen(10009, function(){
	console.log("server Start.....");
	console.log("http://localhost:10009/home");
});
