[![Build Status](https://travis-ci.org/azweb76/node-x-util.png?branch=master)](https://travis-ci.org/azweb76/node-x-util)
#x-util 
Utility package for node applications.

#Usage
npm install x-util --save

```javascript
var xutil = require('x-util');
var strings = xutil.strings;

var obj = xutil.extend({ name1: 'Hello' }, { name2: 'World!' });
console.log(strings.format("{{name1}} {{name2}}", obj));
```
#Modules

##x-util
Root module that exposes all the utility objects/methods.

#####Properties

- common - Access to most commonly used functions like extend.
- strings - Access to common string functions like format.
- command - Access to common command line functions like parse.
- json - Contains json helper functions like find.
- path - Contains path helper functions like find.

#####Functions
- extend - See common extend function.

##common
Contains most commonly used functions like extend.

#####Properties
None

#####Functions
- extend - Recursively extends an object.```javascript extend({{object}}, {{extended}}) ```

##command
Contains functions to support a command line interface.

#####Properties
None

#####Functions
- parse - Parse command line arguments.```javascript parse(process.args) ```

##strings
Contains helper string functions.

#####Properties
None

#####Functions
- format - Replace placeholders using object properties.```javascript format("Hello {{name}}!", { name: "World" }) ```

#####Extensions
- String.startsWith - Returns true is the string starts with startStr. ```javascript 'Hello World'.startsWith('Hello') ```
- String.endsWith - Returns true is the string ends with endStr. ```javascript 'Hello World'.endsWith('World') ```

##path
Contains path helper functions.

#####Properties
None

#####Functions
- find - Traverses up a path to find a file or folder. ```javascript find('/my/full/path', 'package.json') ```

##json
Contains json helper functions.

#####Properties
None

#####Functions
- find - Returns the value of an object based on a path.
```javascript
find({ a: { b: 'Hello' c: 'World' } }, '/a/b') // returns 'Hello'
```
- resolveLinks - Resolves object links.
```javascript
resolveLinks({ a: { b: 'Hello' _c: 'b' } }); // returns { a: { b: 'Hello', c: 'Hello' } }
```
