var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var is_mysql_connected = false;
var mysql = require('mysql')

//*************Code to connect to mysql*************


var connection =  mysql.createConnection({
	host : '<<redated>>',
	user : '<<redated>>',
	password: '<<redated>>'
}); 
connection.connect();


search_database = function(search_string, socket) {
	var query_string = "SELECT DISTINCT ifscCode from CavacServ9Utf0809.VendorApp_bank where ifscCode like '%" 
		+ search_string +"%' LIMIT 10;";
	
	console.log(query_string);
    connection.query(
	    query_string,
	    function selectCb(err, rows) {
	        if (err) {
	            console.log("ERROR: " + err.message);
	            throw err;
	        }
			socket.emit('response_string', rows);
    });

}

//*************Express App*************


app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.sendfile('client.html');
});


//*************socket connection listener*************


io.on('connection', function(socket){
  socket.on('search_string', function(msg){
    console.log('message: ' + msg);
    search_database(msg, socket);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});