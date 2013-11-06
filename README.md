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

Generally the following examples can be executed by the following:

```
node [filename] // '.js' file extension is optional
```

### Command Line

* **write** - write to server log
* **args** - print command line arguments
* **read** - read and write from the command line
* **powershell.js** - execute powershell script in node

### General

* **request.js** - periodically requests the temperature in sydney using a weather api
* **server.js** - simple node.js server
* **nonblocking.js** - shows off node non-blocking i/o. Writes to files and serves HTML requests
* **static.js** - turn any directory into a static webserver with directory listing.

### Chat (TCP)

* **chat.js** - TCP chat server

To run locally:

```
node chat
```

Windows telnet:

```
open localhost 5000
```

### Chat (HTTP with Sockets)

* **app.js** - chat http server that uses sockets

This is a fully featured node application. It contains a grunt file and mocha tests

To run:

```
cd chat
npm install
grunt dev run --force
```

## Further Reading and Examples

* **fullon** - [personal project](https://github.com/alexreardon/fullon) for church camp. Uses express, mongodb (nosql database), handlebars, request, underscore and more!
* **nodejs** - [home page](http://nodejs.org/about/)
* **2009 JSConf** - [slides](http://s3.amazonaws.com/four.livejournal/20091117/jsconf.pdf)
* **2010 JSConf** - [slides](http://nodejs.org/jsconf2010.pdf)
* **Node School** - [site](http://nodeschool.io/)