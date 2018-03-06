[![Build Status](https://travis-ci.org/vasanthv/fetch-lite.svg?branch=master)](https://travis-ci.org/vasanthv/fetch-lite)

# fetch-lite
> A lightweight module to send HTTP(s) requests from Node.js.  

- Not dependent on any third party modules. 
- Purely based on Node.Js `http.request` client.
- Written in less than **30** lines. 😳
- Implements just the fetch() function and nothing else.
- Returns *Promise* (so works with *async/await*).

> Whats missing?   
> - File Upload (multipart/form-data)  
> - Streaming.   

## Install
Install using [npm](https://npmjs.com/).
```
npm install --save fetch-lite
```

*OR*
Using [yarn](https://yarnpkg.com/).
```
yarn install --save fetch-lite
```

## Usage
The idea of fetch-lite is to create a minimal version of  `fetch()` API  described [here](https://fetch.spec.whatwg.org/#fetch-api).  A basic GET request is shown below.

```
const fetch = require('fetch-lite');

fetch('https://httpbin.org/get')
.then(response => console.log(response))
.catch(err => console.error(err));
```

Using async/await.
```
(async () => {
    const response = await fetch('https://httpbin.org/get');
    console.log(response);
})();
```


### Post
Posting a post body.
```
fetch('http://httpbin.org/post', {
    method: 'POST',
    body: {
        hello: 'world'
    }
})
.then(response => console.log(response))
.catch(err => console.error(err));
```

Posting a JSON body.
```
fetch('http://httpbin.org/post', {
    method: 'POST',
    body: {
        hello: 'world'
    },
    headers: {
        'content-type': 'application/json'
    }
})
.then(response => console.log(response))
.catch(err => console.error(err));
```

Posting a Buffer.
```
fetch('http://httpbin.org/post', {
    method: 'POST',
    body: Buffer.from("Hello World")
})
.then(response => console.log(response))
.catch(err => console.error(err));
```

## API
The module export one function which accepts only 2 params.
1. URL. String *(Required)*
2. Options. Object. *(Optional)*
	- method. String. (POST | GET | PUT etc). *Default GET*.
	- body. String or [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) or [Buffer](https://nodejs.org/api/buffer.html).
	- headers. [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).
	- followredirect. Boolean. *Default True*.

## Licence
MIT