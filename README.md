/*** NodeJS ***/

# 1. What is Node.js?
### Node.js History
- 2009: NodeJS was created by Ryan Dahl and other devs working at Joyent
- 2011: NPM created
- 2014: io.js project forked
- 09/14/2015: Nodejs 4.0 released
### How NodeJs works
- Apache Steaks and Chops
	+ New guest => new user
	+ Order  => Request
	+ Waiter => thread, has a own thread, handle all orders
	+ chef => file system/data store
	+ Every request is single-thread
	+ When the waiter send order to the chef, he can't do anything, he just wait until food is ready. The waiter bring the food to the guest.
	+ After that, waiter is firing.
	+ Every guest has a waiter.
- Chez Node
	+ At this cafe, just one waiter because NodeJs is single-threaded.
	+ Guest A orders => Waiter place A's order to the chef => Waiter move to anther table (Guest B) to get new order => When A's food is ready, Waiter goes and gets the food and send the chef new order, then deliver the food to A. He continues take another other from a new table.
	+ Everthing waiter needs to do represents a new event: a new table, place order, delivery order
	+ Waiter doesn't wait, No Blocking
	+ Chez Node can easily be expanded by simply duplicating or forking the restaurant into a neighboring space.
- Summary: 
	+ NodeJs is single-threaded
	+ All users are sharing the same thread
	+ Events are raised and recorded in an event queue and then handled in the order that they were raised.
	+ NodeJS is asynchronous, which mean that is can do more than one thing at a time. This ability to multitask is what makes NodeJs so fast.

# 2. Installing NodeJs
### Installing NodeJs on a PC
- Download NodeJs at : https://nodejs.org/en/download/
- Check version of NodeJs: Open CMD => node -v

# 3. Node Core
### The global object
- Window object is a global object in JS. Global object in NodeJS is Global.
- `node <file_name>` : Run Node.js file with Node, file_name can include that js extension or not because NodeJs assumed that the file is going to be js
- Every nodejs file that we create is it's own module. Any variable that we create in a nodejs file, is scoped only to that module. That variable is not added to global object. 
- `console.log("msg")`: see message in console, console is a object
- `__dirname`: get full path to the current directory where this module is located.
- `__filename`: get full path to the current file as well as this file's name.
- Path module: var path = require("path");
	+ var filename = path.basename(__filename); just print file name of the file.
### Argument variables with process.argv
- Process object: It can be accessed from anywhere, process is a global module.
- `process.argv`: is a variable, is a array. It contains a path to node and a path to file nodejs
- When run file nodejs, I can add argument and access it from process.argv. So I can get info the app when I start it. 
### Standard input and standard output
- process.stdout.write("str");
	+ Add line break by: \n
	+ The `trim()` method removes whitespace from both sides of a string. It does not change the original string.
- process.stdin.on()
### Global timing functions
- setTimeout(function(){}, time);
- clearTimeout(nameOfTimeout);
- setInterval(function(){}, time);
- clearInterval(nameOfInterval);

## 4. Node modules
### Core modules
- Modules were installed locally with your installation of NodeJS. It's called `core modules`.
- Import module to file nodeJS: var abc = require('nameOfModules');
- path module: provide some function to work with path
- util module: contain logs,
	+ util.log = console.log: util.log also add a date and time stamp. 
- v8 module: used to get info about memory. 
- Create a new path from path module: var newPath = path.join(__dirname, 'abc', 'xyz',...) :  create a full path __dirname/abc/xyz/... 
### Collecting information with Readline
- var readline = require('readline');
	+ readline module: I can create an instance of the readline object which will create prompt for me by sending it the standard input and standard output objects. 
	+ don't use stdin and stdout directly 
	+ var rl = readline.createInterface(process.stdin, process.stdout);
- See more: https://nodejs.org/api/readline.html
### Handling events with EventEmitter
- Creating listeners for an emit custom Events.
- Import module: events
- Create emitter : emitter = new events.EventEmitter();
- emitter.on(param1, param2):
	+ param1: 'nameOfEvent', I can name whatever
	+ param2: function callback when event emits. function (arg1, arg2, ..)
- emitter.emit('nameOfEvent', arg1, arg2, ..)
- util.inherits(A, B) : Object A inherits Object B, Object A has all functions of Object B.
### Exporting custom modules
- Every JS file is a module.
- I can export file JS, and another JS file can import that file to use.
- Export file: module.exports = NameOfObject  
	+ module.exports : is a object
- Import file: require('path');
### Creating child process with exec
- child_process module: has a execution function.
	+ exec = require ('child_process').exec
	+ exec.("command", function (err, stdout){})

### Creating child process with spawn
- spawn is made for processes like this, where execute was made for  asynchronously synchronous processes
- var spawn = require('child_process').spawn;
- var cp = spawn("node", ["alwaysTalking"]);
	+ first arg: the command I want to run in the terminal
	+ second arg: an array of all the things that I would run.

## 5. The File System
### Listing directory files
- var fs = require("fs"); //Files system module, do just about files and directories
- `fs.readdirSync('path')`: show files name and directories name inside path
### Reading files
- Can read text and binary files
- `readFileSync("urlOfFile")`;
- When I read text file, I have to add the second argument is going to be the text encoding, like UTF-8.
- I read file without a text encoding, I read file data as binary.
- Can read sync or async, when I use async function, I have to had a callback function.
- fs.stat(): use to get file statistics.
### Writing and appending files
- writeFile("nameOfFile", str, callbackFunction);
	+ if nameOfFile exists : nameOfFile will be override.
	+ else: create a new file and write file.
- appendFile("nameOfFile", str); continue write in the file that exists.
### Directory creation
- `fs.mkdir("nameOfDir", callback)` : create a new directory
	+ if nameOfDir exists: ERROR
### Renaming and removing files
- `fs.rename("oldUrlFile", "newUrlFile", callback)`: rename and move files 
- `fs.renameSync("oldUrlFile", "newUrlFile")`
- `fs.unlink("urlFile")`: remove files
	+ If file doesn't exist => ERROR
- `fs.existsSync()` : check file exists
- `fs.rmdir()` : remove directory
### Readable file streams
- Streams give us a way to asynchronously handle continuous data flows
- Streams in NodeJS are implementations of the underlying abstract extreme interface.
- Streams reads file chunk by chunk, Length of chunk is 65536.
- `var stream = fs.createReadStream("file", "text-encode")`
- stream.on ('data', callback)
### Writable file streams
- `var stream = fs.createWriteStream("file");`
- stream.write(str);

## 6. The HTTP module
### Making a request
- use `https` or `http` module to make request
- create options: is a object contains hostname, port, path, method
- var req = https.request(options, function(res){});
	+ res.headers: return response header
	+ res.statusCode : return server status 
	+ res.on('data', callback)
	+ res.on('end', callback)
	+ res.on('error', callback)
### Building a web server
- Use `https` or `http` to build web server
- var server = https.createServer(function(req, res) {} );
	+ req : that is request object, contain info about the requested headers, user,..
	+ res: blank response object, 
	+ res.writeHead(statusCode,param2)
		* statusCode: 200: response success; 404: file not found
		* param2 : contain 'Content-Type' of res: 'text/plain' or 'text/html' or 'text/css' or 'image/jpeg' or 'text/json'
	+ res.end(str); contain response
- server.listen(): use to specific the IP address and incoming port for all of our web requests for this server.
### Serving files
### Serving JSON data
- res.end(JSON.stringify(data));
	+ A common use of JSON is to exchange data to/from a web server.
	+ When sending data to a web server, the data has to be a string.
	+ Convert a JavaScript object into a string with JSON.stringify().
### Collecting POST data
-  req.method === "POST"

## 7. Node Package Manager
### Installing npms locally
- Find package at: npmjs.com
- `npm install <name_package>` :  install locally
- `npm remove <name_package>` : remove package 
### Installing npms globally on a PC
- `node-dev` package: is a tool that we can use while developing node applications. We can run our code with node-dev and it will automatically restart our app when we make any change to source code.
- Install with administrator, add -g tag
- jshint: is a tool that will take a look at our code and let us know if there are any issues or problems with it.

### File servers with httpster
- httpster package: give us a static file server, can build a web server that serve static content. 
- Express framework: is a framework for developing web server applications.

## 8. Web servers
### The package.json file
- When you want to serve more than static files, you need to choose a framework.
- Express framework: is a framework for developing web server applications.
- Link express document: https://www.npmjs.com/package/express 
- Create `package.json`: npm init
- `CORS package` : Cross Origin Resource Sharing, it allow open up our api so that it is accessible by other domains.
- `body-parser package`:
- `npm install`: npm will look at package.json and install all of the dependencies at once.
- `package.json`: give us a manifest of info about the package and it keeps track of all the dependencies that this package requires.
### Intro to Express
- Import Express package: var express = require('express');
- Create new instance of express: var app = express();
- Add middleware to application
	+ Middleware as being customized plugins that we can use with Express to add functionality to application.
### Express routing and CORS
- `app.get('route', callback)`: set up a get route.
### Express post bodies and params
-  `body-parser package` : is a middleware that parse the data that is posted to this API. So if we post data from application, it will send data as .json. 

## 9. WebSockets
### Creating a WebSocket server
- WebSocket allow for atrue two way connection between the client and the server.
- WebSocket use their protocol to send and receive messages from a TCP server.
-  var WebSocketServer = require("ws").Server;
- var wss = new WebSocketServer({port: 3000}); 
### Broadcasting messages with WebSockets
- When a client input a message, a message will broadcast to all clients.
- ws.clients
### Broadcasting messages with Socket.IO
- npm install socket.io --save
- With Socket.IO, we don't actually connect to the pure websocket. Socket.IO handles all of the connections for us.

## 10. Testing and Debugging
### Testing with mocha and Chai
- Mocha: 
	+ Install: `npm install -g mocha`
	+ Run mocha test: `mocha`
	+ Mocha always looks in the test directory for all it's test. So you need to create test directory.
- Write test:
	+ `describe("nameFunctionToTest()", callback)`: use to set up a suite of tests.
	+ `it("ruleOfTest")`: each test use it() 
		- Ex: it("should print the last name first")

- Test-driven development: Write the test => Run the test, fail => Write the code to make the test pass.

- Mocha don't check value, so I need Chai
- Chai
	+ Install: --save-dev, because Chai is going to be needed to test our application
	+ Import: var expect = require('chai').expect;
- Definding function inside an object literal.

### Asynchronous mocha testing
- Describe statements can be nested.

### Mocking a server with Nock
- `nock package` to create Mock web server that require hitting a web server, we can hit a fake or mock web server instead.
- When use Mock web server, We are not actually hitting Wikipedia, and waiting for that response page. This test executes immediately because we're only hitting the mock server and the mock server's returing his small string but this tells us that the "LoadWiki function is behaving as expected" 

### Injecting dependencies with rewire
- Whenever we are testing a module, a function, we would refer to that module or function, that is "under test" as the "system under test" or SUT. Other modules and functions that our SUT may be dependent upon, are refferd to as "collaborators". We can mock out any dependencies.
- `rewire` is a node module that allow us to inject mocks 
- Require ("module") => rewire("module") 
	+ Can get, set private in that module.

### Advanced testing Sinon spies
- Sinon.JS is an open source module that using to create mock objects for our test.
- Link reference: http://sinonjs.org/
- Sinon spies:
	+ spy(): it can be invoked just like console.log, but it's not real console.log function. It give us details about how console.log is called and with that data console.log is called.

### Advanced testing Sinon stubs
- sinon.stub()
### Code coverage with Istanbul
- Install `istanbul` globally
- Istanbul is a node module that we can use to generate code coverage reports.
- Code coverage reports tell us how many lines of code our tests actually cover. 
- We can coverage reports from our mocha tests.
### Testing HTTP endpoints with Supertest
### Checking server responses with Cheerio

## 11. Automation and Deployment
### Hinting your code with Grunt
- Grunt: conjunction with npm scripts to automate static processes to our code base.
- Grunt is a command line interface that we can run automated processes.
- Install `grunt-cli` globally
- Install `grunt` --save-dev
- Install `grunt-contrib-jshint` --save-dev
- `grunt.initConfig() : initialize Crunt configuration.

### Converting LESS to CSS with Grunt
- Install `grunt-contrib-less` --save-dev
- Install `grunt-autoprefixer`

### Bundling client scripts with Browserify
- Browserify: is a Node project that using CommonJS for our client-side JS.
### Rapid development with Grunt Watches
### Automation with npm
### Debugging with npm
- `node-inspector` is a module to debug NodeJs code.
- Install node-inspector globally.

## 12. Others
### HTTPS and HTTP Difference
- HTTP: HyperText Transfer Protocol 
- HTTPS: HyperText Transfer Protocol Secure
	+ the computers agree on a "code" between them, and then they scramble the messages using that "code" so that no one in between can read them. This keeps your information safe from hackers.
