var r = require("rethinkdb");
var config = {
	"host" : "localhost",
	"port" : 28015
};

module.exports.connect = function(req,res,next){
	(function _connect(){
		r.connect(config,function(err, conn){
			if (err) {return;}
			req._rdb = conn;
			next();
		});
	})();
};

module.exports.close = function(req,res,next){
	(function _close(){
		req._rdb.close();
	})();
};