const express=require('express');
const http=require('http');

const app=express();
const port=8004;
const server=http.createServer(app);

var MongoClient = require('mongodb').MongoClient;

app.use(
    express.urlencoded({
      extended: true
    })
  );

app.use(express.json());

app.post('/rating',(req,res)=>
{

  console.log(req.body.DriverName +" "+req.body.Rating);
  MongoClient.connect('mongodb://mongodb:27017/DB',{useUnifiedTopology: true}, function (err, client) {
  if (err) throw err

  var db = client.db('DB');
  var myobj =
   { DriverName: req.body.DriverName ,
     Rating: req.body.Rating
   };

  db.collection("Rating").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 data inserted");
    
  });

});

});

server.listen(port,()=>
{
    console.log("Server is listening on localhost:"+port);
});                            
 