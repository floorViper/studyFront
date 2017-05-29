var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// post 방식 "/form/action1" 요청 처리 
app.post("/form/action1", function(req, res){
  //post 방식 전송된 파라미터 읽어오기
  var email = req.body.email;
  //콘솔에 출력해보기
  console.log("email:"+email);
  //간단 문자열 응답하기
  res.end("post /form/action1 ok!");
});

// post 방식 "/action1" 요청 처리
app.post("/action1", function(req, res){
  //post 방식 전송된 파라미터 읽어오기
  var email = req.body.email;
  //콘솔에 출력해보기
  console.log("email:"+email);
  //간단 문자열 응답하기
  res.end("post /action1 ok!"); 
});

// get 방식 "/form/request1" 요청 처리 
app.get("/form/request1", function(req, res){
  res.end("get /form/request1 ok!");
});

// get 방식 "/request2" 요청 처리
app.get("/request2", function(req, res){
  res.end("get /request2 ok!");
});

// get 방식 "/request3" 요청 처리
app.get("/request3", function(req, res){
  //GET 방식 전송 파라미터 추출 
  // ?num=1&name=kimgura 
  var num = req.query.num;
  var name = req.query.name;

  console.log("num:"+num+" name:"+name);

  res.end("get /request3 ok!");
});

// get 방식 "/request4" 요청 처리
app.get("/request4", function(req, res){
  var num = req.query.num;
  var name = req.query.name;
  console.log("num:"+num+" name:"+name);
  res.end("get /request4 ok!");
});

// post 방식 "/ajax/test01" 요청 처리
app.post("/ajax/test01", function(req, res){
  //요청 파라미터 읽어오기
  var msg=req.body.msg;
  //콘솔에 출력하기
  console.log("msg:"+msg);
  //응답하기
  res.end("post /ajas/test01 ok!");
});

//get 방식 "/ajax/test02" 요청 처리
app.get("/ajax/test02", function(req,res){
  //요청 파라미터 추출
  var num=req.query.num;
  console.log("num:"+num);
  //문자열 제이슨 응답하기
  res.end('{"num":1,"name":"kimgura","isMan":true}');
});

app.get("/ajax/test03", function(req,res){
  //요청 파라미터 추출
  var num=req.query.num;
  console.log("num:"+num);
  //json으로 응답하기 
  res.json({"num":1,"name":"kimgura","isMan":true});
});

app.get("/ajax/idCheck", function(req,res){
  var id=req.query.inputId;
  console.log('id:',id)
  if(id=="gura"){
    res.json({canUse:false});
  }else{
    res.json({canUse:true});
  }
});

//DB 에 있는 sample Data 라고 가정
var girls=[];
girls.push({
  src:'/images/image1.png',
  title:"제시카",
  content:"어쩌구..저쩌구.."
});
girls.push({
  src:'/images/image2.png',
  title:"유리",
  content:"어쩌구..저쩌구.."
});
girls.push({
  src:'/images/image3.png',
  title:"테연",
  content:"어쩌구..저쩌구.."
});
girls.push({
  src:'/images/image4.png',
  title:"윤아",
  content:"어쩌구..저쩌구.."
});
girls.push({
  src:'/images/image5.png',
  title:"티파니",
  content:"어쩌구..저쩌구.."
});
girls.push({
  src:'/images/image6.png',
  title:"수영",
  content:"어쩌구..저쩌구.."
});

app.get("/ajax/moreInfo", function(req,res){
  var index=req.query.index;
  //인덱스에 해당하는 정보를 JSON 문자열로 응답한다.
  setTimeout(function(){
    res.json(girls[index]);
  },1000)
  
});

app.post("/ajax/login", function(req, res){
  var id=req.body.id;
  var pwd=req.body.pwd;
  console.log("id:"+id+" ...pwd"+pwd);
  res.end("ok!");//임시 응답
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
