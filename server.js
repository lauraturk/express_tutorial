const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const cookieParser = require('cookie-parser');

app.use(cookieParser())

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.use(urlencodedParser);
app.use(multer({ dest: '/tmp' }));

app.get('/index.htm', (req, res) => {
  res.sendFile(_dirname + "/" + "index.htm");
})

app.get('/', function(req, res) {
   console.log("Cookies: ", req.cookies)
})

app.post('/file_upload', function (req, res) {
   console.log(req.files.file.name);
   console.log(req.files.file.path);
   console.log(req.files.file.type);
   var file = __dirname + "/" + req.files.file.name;

   fs.readFile( req.files.file.path, function (err, data) {
      fs.writeFile(file, data, function (err) {
         if( err ){
            console.log( err );
            }else{
               response = {
                  message:'File uploaded successfully',
                  filename:req.files.file.name
               };
            }
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
   });
})

app.get('/process_get', (req, res) => {
  response = {
    first_name:req.query.first_name,
    last_name:req.query.last_name
  };
  console.log(response);
  res.end(JSON.stringify(response));
})

app.get('/', function(req, res) {
  res.send('Hello World');
})

app.post('/', (req, res) => {
  console.log('Got a post request for the homepage');
  res.send('hello post');
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.delete('/del_user', (req, res) => {
  console.log('got a delete request for /del_user');
  res.send('hello delete')
})

app.get('/list_user', (req, res) => {
  console.log('got a get request for /list_user');
  res.send('page listing');
})

app.get('/ab*cd', (req, res) => {
  console.log('gota  get request for /ab*cd');
  res.send('page pattern match');
})


const server = app.listen(3000, () => {
  const host = server.address().address
  const port = server.address().port

  console.log('Example app listening at localhost 3000', host, port);
})
