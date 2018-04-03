var express=require('express');
var mysql=require('mysql');
var bodyParser=require('body-parser');
var app=express();

app.use(bodyParser.urlencoded({ extended: true }));

var pool=mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password:'root',
  database:'xiangmu',
  port:3306
})

app.post('/', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin','*')
  var json=req.body.fenlei
  pool.getConnection(function(err,connection){
    if(err){
      console.log(err)
    }
    var sql="select * from lou where fenlei=?"
    connection.query(sql,[json],function(err,data){
      if(err){
        console.log(err)
      }
      // var obj=eval("("+data+")")
      console.log(data)
      res.send(data)
      
      
      connection.end()
      
      
    })
  })
});




app.listen(8000,function(){
  console.log("ok")
})