//node09_file_read.js

// fs:파일읽기 , 파일쓰기를 처리하는 모듈
var fs = require('fs');

//1. 비동기식
//          파일명:절대경로                                   인코딩       콜백함수                    읽은 파일의 내용
fs.readFile(__dirname+"/node01_server.js",'utf-8', function(error, data){
	console.log('====== 파일읽기(비동기식) ========');
	console.log(data);
});

//2. 동기식
//              파일명                                                        인코딩
var data = fs.readFileSync(__dirname+"/node02_server_get.js", 'utf-8');
console.log("-------파일읽기(동기식) ---------------");
console.log(data);