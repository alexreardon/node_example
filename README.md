# Node.js - Introduction and Demystification

An series of introductory examples for node.js

Please run the following before executing the examples (it installs all dependencies):
```
npm install
```

## Presentation

The presentation can be run by:

```
cd presentation
npm install
grunt serve
```

OR use my static server

```
node .\general\static.js .\presentation
```

## Examples

Generally the following examples can be excuted by the following:

```
node [filename] // '.js' is optional
```

### Command Line

* **write** - write to server log
* **args** - print command line arguments
* **read** - read and write from the command line
* **powershell.js** - execute powershell script in node

### General

* **request.js** - periodically requests the temperature in sydney using an wheather api
* **server.js** - simple node.js server
* **nonblocking.js** - shows off node non-blocking i/o. Writes to files and serves HTML requests
* **static.js** - turn any directory into a static webserver with directory listing.

### Tcp

* **chat.js** - TCP chat server
To run locally:

```
node chat
```

Windows telnet:

```
open localhost 5000
```

### Chat

* **app.js** - chat http server that uses sockets

## Further Reading and examples

* **fullon** - [personal project](https://github.com/alexreardon/fullon) for church camp. Uses express, mongodb (nosql database), handlebars, request, underscore and more!
* **nodejs** - [home page](http://nodejs.org/about/)
* **2009 JSConf** - [slides](http://s3.amazonaws.com/four.livejournal/20091117/jsconf.pdf)
* **2010 JSConf** - [slides](http://nodejs.org/jsconf2010.pdf)
* **Node School** - [site](http://nodeschool.io/)