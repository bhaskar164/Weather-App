const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const parseJson = require('parse-json');
 

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// request('http://api.openweathermap.org/data/2.5/weather?q=Canada&appid=b1a934a0b26a79185bec4da76a28f1fb',
// 		function (error, response, body) {
// 			  console.error('error:', error); // Print the error if one occurred
// 			  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
// 			  console.log('body:', body); // Print the HTML for the Google homepage.
// });

app.get('/', function(req,res){
	res.render('index.ejs')}
);
app.post('/submit',function(req,res){
	let cityName = req.body.cityName;
	let reqString = 'http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=b1a934a0b26a79185bec4da76a28f1fb';
	
	request(reqString,function (error, response, body) {
			  console.error('error:', error); 
			  console.log('statusCode:', response && response.statusCode); 
			  // console.log('body:', body); 
			// console.log("body: %j", body);
		    let data = parseJson(body);
			console.log(data);
		
		// res.send(body);		
		res.render("display2.ejs",{body:data});
});
	
});


app.listen(81, function(){
	console.log("Server is running!");
});
