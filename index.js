
// node_modules의 express 패키지를 가져온다.
var express = require('./config/express')
var expressForStatic = require("express");

//app이라는 변수에 express 함수의 변환 값을 저장한다.
var app = express()

//환경변수에서 port를 가져온다. 환경변수가 없을시 7002포트를 지정한다.
var port;
const argv = process.argv.slice(2);

if(argv[0] == "deploy"){
    port = app.listen(7002);
}
else if(argv[0] == "test"){
    port = app.listen(8000);
}


// express 서버를 실행할 때 필요한 포트 정의 및 실행 시 callback 함수를 받습니다
app.listen(port, function() {
    if(argv[0] == "deploy") console.log(`start! ${argv[0]} express server on port 80(7002)`);
    else if(argv[0] == "test") console.log(`start! ${argv[0]} express server on port 8000`);
})