/**
 * @file
 * Node.JS server script for sockets test.
 *
 */

// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";

// You will see this name in eg. 'ps' or 'top' command
process.title = 'Node Second Screen';

// Create a websocket.
var WebSocketServer = require('websocket').server; 
//filesystem variable
var fs = require('fs');
//path variable
var path = require('path');
//require http for creating server
var http = require('http');
//Port for our sockets
var webSocketsServerPort = 1337;

// Clients object stores all connections.
var clients = [ ];
//stores quanity of connections
var clientIndex = -1;


/**
 * Generates a random ID.
 *
 * 
 */
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var i;
  //generationg id 
  for (i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length * Math.random()));
  }
  //if there is not uniqueID
  clients.forEach(function(item, i, clients) {
    if (item.uniqueID == text){
      text = makeid();
    }
  });
  return text;
}
//get file
function getFile(localPath, res, mimeType) {
  fs.readFile(localPath, function(err, contents) {
    if(!err) {
      res.setHeader("Content-Length", contents.length);
      res.setHeader("Content-Type", mimeType);
      console.log(mimeType);
      res.statusCode = 200;
      res.end(contents);
    } else {
      res.writeHead(500);
      res.end();
    }
  });
}
// Create the HTTP server.
var server = http.createServer(function (request, response) {
    var url = request.url;//get current url
    url = url.split('?');//get uri
    console.log(url);
    switch(url[0]) {
      //desktop page
      case "/":
        fs.readFile("index.html", function(err, text){
          response.writeHead(200,{"Content-Type": "text/html"});
          response.end(text);
        });
        break;
      //mobile page
      case "/m":
        fs.readFile("mobile.html", function(err, text){
          response.writeHead(200,{"Content-Type": "text/html"});
          response.end(text);
        });
        break;
      case "/m/":
        fs.readFile("mobile.html", function(err, text){
          response.writeHead(200,{"Content-Type": "text/html"});
          response.end(text);
        });
        break;
      //other supporting files
      default:
        //get extension of file
        var ext = path.extname(url[0]);
        var localPath = __dirname;
        var validExtensions = {
          ".html" : "text/html",      
          ".js": "application/javascript", 
          ".css": "text/css",
          ".txt": "text/plain",
          ".jpg": "image/jpeg",
          ".gif": "image/gif",
          ".png": "image/png",
          ".ttf": "font/truetype",
          ".ico":"image/x-icon",
          ".mp3": "audio/mpeg",
        };
        var isValidExt = validExtensions[ext];
        if (isValidExt){
          localPath += url[0];
          fs.exists(localPath, function(exists) {
            if(exists) {
              console.log("Serving file: " + localPath);
              getFile(localPath, response, validExtensions[ext]);
            } else {
              console.log("File not found: " + localPath);
              response.writeHead(404);
              response.end();
            }
          });
        }
        else{
          console.log("Invalid file extension detected: " + ext)
        }
        break;
    }
});
// When the server starts listening.
server.listen('1337', '128.199.40.117');
// Create the websockets server.
var wsServer = new WebSocketServer({
  httpServer: server
});
// WebSocket server - a connection is made from desktop or mobile device.
wsServer.on('request', function (request) {


  console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

  // The connection is stored.
  var connection = request.accept(null, request.origin);

  // Create an index for the connection so we can delete it later.
  clientIndex++;
  request.index = clientIndex;

  // Store the connection in the clients object.
  clients[clientIndex] = { 'connection': connection };

  // A message is received from the desktop or mobile device.
  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      var i, send;
      var received = JSON.parse(message.utf8Data);
      switch(received.type) {
        case 'connect':
          if (received.data === 'desktop')
          {
            // Generate the unique ID.
            var uniqueID = makeid();
            console.log((new Date()) + ' Desktop connected and assigned ID: ' + uniqueID + ' at index ' + clientIndex);
            // Store the connection type and unique ID.
            clients[request.index].type = 'desktop';
            clients[request.index].uniqueID = uniqueID;
            // Send the unique ID back to the client.
            send = JSON.stringify({ type: 'uniqueID', data: uniqueID });
            connection.send(send);
          }
          else{
            console.log((new Date()) + ' Mobile device connected: ' + received.uniqueID);
            //check if only one mobile
            if (received.uniqueID){
              var not_single = false;
              clients.forEach(function(item, i, clients) {
                  if (item.uniqueID === received.uniqueID && item.type === 'mobile') {
                    not_single = true;
                    console.log((new Date()) + ' you need only one mobile with ID: ' + received.uniqueID)
                  }    
              });
              // Search for a desktop client and send the message to them.
              if (!not_single){
                // Store the connection type and unique ID.
                clients[request.index].uniqueID = received.uniqueID;
                clients[request.index].type = 'mobile';
                clients.forEach(function(item, i, clients) {
                  console.log(item.type);
                  if (item.uniqueID === received.uniqueID && item.type === 'desktop') {

                    console.log((new Date()) + ' Notifying desktop that mobile has connected.');

                    // Send the message to the desktop.
                    send = JSON.stringify({ type: 'mobile_device_connected' });
                    item.connection.send(send);
                    console.log((new Date()) + ' Notifying mobile bout sex and name.');
                    send = JSON.stringify({ type: 'sex', data: item.sex });
                    clients[request.index].connection.send(send);
                    console.log(item.sex);
                    send = JSON.stringify({ type: 'name', data: item.namee });
                    clients[request.index].connection.send(send);
                  }    
                });
              }
            } 
          }
          break;
        case 'sex':
          console.log(received.data);
          if (received.data == 'парень')
            clients[request.index].sex = 'male';
          else
            clients[request.index].sex = 'female';
          break;
        case 'name':
          clients[request.index].namee = received.data;
          break;
        case 'swipe_request':
          console.log(received.data);
          console.log((new Date()) + ' Swipe request received:' + clients[request.index].uniqueID);
          clients.forEach(function(item, i, clients) {
            if (clients[i].uniqueID === clients[request.index].uniqueID && clients[i].type === 'desktop') {

              // Send the message to the client.
              send = JSON.stringify({ type: 'swipe_request', data: received.data,count: received.count });
              clients[i].connection.send(send);
            }
          });
          break;
        case 'show_next':
          console.log((new Date()) + ' Show next request received:' + clients[request.index].uniqueID);
          send = JSON.stringify({ type: 'show_next', data: received.data });
          clients[request.index].connection.send(send);
          break;
        case 'keypress':
          console.log((new Date()) + ' keypress received:'+ received.data + '' + clients[request.index].uniqueID);
          send = JSON.stringify({ type: 'keypress', selector: received.selector, data: received.data });
          clients[request.index].connection.send(send);
          break;
        case 'glitch':
          console.log((new Date()) + ' glitch received:'+ received.data + '' + clients[request.index].uniqueID);
          send = JSON.stringify({ type: 'glitch', data: clients[request.index].sex });
          clients[request.index].connection.send(send);
          break;
        case 'notify':
          clients.forEach(function(item, i, clients) {
            if (item.uniqueID === received.uniqueID && item.type === 'mobile') {
              console.log((new Date()) + ' Notifying mobile some features.');
              send = JSON.stringify({ type: 'notify', data: received.data, uniqueID: received.uniqueID });
              item.connection.send(send);
              console.log(received.data);
            }
          });
          break;

      }
    }
  });
  connection.on('close', function (connection) {
    console.log((new Date()) + ' Removing client index ' + request.index);
    delete (clients[request.index]);
  });
});