// Module 2: Node.js and React Basics

/* -------------------------------- */
// load the core http module, which contains methods to load the callback function you have created)
// Performs when request from browser is sent, then loads it into the server
const webModule = require("http");
/* -------------------------------- */

// Load the core node filesystem (fs) module, using js promises instead of callback
// a promise represents the eventual completion of asynchronization opertion of its result
const fsModule = require("fs").promises;

// Create a function to respond to http requests

// Accepts request and respond back to it
const takeRequest = function(webReq, webRes) {
  // output request url
  // used to see what url is requested
  console.log(webReq.url);

  // ***data can only do 2 things: 1) Send back the contents of html file, send back the contents of the json file

  if (webReq.url === "/") {
    // check request url, if root, return html file, using filesystem method (fs) to send a request to the web browser
    // special variable __dirname has absolute path were node is running
    fsModule.readFile(__dirname + "/index.html")
      // ***in a promise you can chain a ".then" clause
      // ***.then clause - will run after the fs has read the file
      .then(
        // ***can also use function(contents) { } 
        // readfile method sends back the entire content of the file using the variable name contents
        fileContent => {
          // set http response header entry
          //***, passing 2 args so web browser knows its getting the contents of an html file
          webRes.setHeader("Content-Type", "text/html; charset=UTF-8");
          // return 200 OK status code
          webRes.writeHead(200);
          // send back file contents + close response
          webRes.end(fileContent);
        });
  } else {
    // Otherwise, if request url not root, return json file
    // ***looks at json file to send back a data structure back to react app in index.html
    fsModule.readFile(__dirname + "/datafile.json")
      .then(fileContent => {
        webRes.setHeader("Content-Type", "application/json; charset=UTF-8");
        webRes.writeHead(200);
        webRes.end(fileContent);
      });
  }
};

// create an http web server instance
const webServer = webModule.createServer(takeRequest);

// define the TCP port and IP address to tell our http server to listen to
const serverHost = "0.0.0.0";  // replit is going to override this from localhost to our workspace
const serverPort = "8080";  // replit is going to override this to use port 443 (SSL https

// call the listen() method to start listening to http requests
webServer.listen(
  serverPort,
  serverHost,
  () => {
    console.log('Server is now up and running!');
  }
);


// non-arrow function syntax of same code as lines 61-65 above
/*
webServer.listen(serverPort, serverHost, function()) {
  console.log('Server is running on http://${serverHost):${serverPort}';
});
*/
