var express = require('express')
	,app = express()
	,http = require('http').Server(app)
	,socket = require('socket.io')(http)
	,bodyParser = require('body-parser')
	,r = require('rethinkdb')
	,db = require("./db");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function(req,res,next){
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH");
	res.setHeader("Access-Control-Allow-Headers","*");
	res.setHeader("Access-Control-Allow-Credentials",false);
	next();
});
app.use(db.connect);

var UserRoute = express.Router();

UserRoute.route("/")
	.get(function(req,res){
		r.db("api").table("user").changes().run(req._rdb).then(r => {
			res.send(r);
		});
	});

UserRoute.route("/join")
	.post(function(req,res){
		r.db("api").table("user").filter(req.body).run(req._rdb).then(c=> c.toArray()).then(r =>{
			console.log(r);
		});
	});

UserRoute.route("/user")
	.get(function(req,res){
		r.db("api").table("user").run(req._rdb).then(c => c.toArray()).then(r => {
			res.send(r);
		});
	})
	.post(function(req,res){
		r.db("api").table("user").insert(req.body).run(req._rdb).then(r => {
			res.send(r);
		});
	});
UserRoute.route("/user/:userId")
	.get(function(req,res){
		r.db("api").table("user").filter({"id":req.params.userId}).run(req._rdb).then(c => c.toArray()).then(r => {
			res.send(r);
		});
	})
	.put(function(req,res){
		r.db("api").table("user").filter({"id":req.params.userId}).update(req.body).run(req._rdb).then(r => {
			res.send(r);
		});
	})
	.patch(function(req,res){
		r.db("api").table("user").filter({"id":req.params.userId}).update(req.body).run(req._rdb).then(r => {
			res.send(r);
		});
	})
	.delete(function(req,res){
		r.db("api").table("user").filter({"id":req.params.userId}).delete().run(req._rdb).then(r => {
			res.send(r);
		});
	})

app.use(UserRoute);

app.get("/",function(req,res){
	res.send("1");
});


http.listen(1000,function(){
	console.log("Server started");
});