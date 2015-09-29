//Initialize app
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var employeeModel = require('../models/employee')
var dbConfig = require('../server/dbconfig.js');
var oracledb = require('oracledb');
var path = require('path');
oracledb.maxRows = 250;
oracledb.autoCommit = true;
oracledb.outFormat=oracledb.OBJECT;
oracledb.createPool (
  {
	    user          : dbConfig.user,
	    password      : dbConfig.password,
	    connectString : dbConfig.connectString
  },
  function(err, pool)
  {
	app.pool = pool;
  });
//Body parser helps our parse http request's body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 app.use(express.static(path.resolve('client/')));
app.get('/', function(req, res) {
        res.sendfile(path.resolve('client/index.html')); // load the single view file (angular will handle the page changes on the front-end)
    });
//set app port
var port = process.env.PORT || 8888;

//configure routes
var router = express.Router();
app.use('/api',router);

router.route('/employees')
	//Get all employees
	.get(function(req,res){
		employeeModel.find(app.pool,function(data){
		res.set('Content-Type', 'application/json');
		res.send(data)
		});
	})
	.post(function(req,res){
		employeeModel.create(app.pool,req.body,function(data){
		res.json(data);
		});
	})
	.put(function(req,res){
		employeeModel.update(app.pool,req.body,function(data){
		res.json(data);
		});
	})
	.delete(function(req,res){
		employeeModel.delete(app.pool,req.body,function(data){
		res.json(data);
		});
	})


app.listen(port);
console.log('Server listening on port: '+port);
