/**
 * A lightweight module to send HTTP(s) requests from Node.js.
 * 
 * Input Params:
 * URL: URL to which the request is to be made. (Required)
 * Request init: 
 *  - method: eg. GET, POST. Default GET
 *  - headers [JSON Object]
 *  - body [JSON Object]
 *  - auth. String. "user:password"
 *  - followredirect [Boolean]. Default true.
 * 
 * Returns a Promise
 * Output Params
 *  - headers
 *  - statusText
 *  - status
 *  - url
 *  - body
 * 
 */

const fetch = (url, options) => {
    return new Promise((resolve, reject) => {
        const isJson = (str) => {
            try { return JSON.parse(str) } 
            catch (e) { return false }
        }
        const req = require('url').parse(url);
        const client = (req.protocol == 'https:') ? require('https') : require('http');
        req['method'] = options.method || 'GET';
        req['headers'] = {};
        options.headers && Object.keys(options.headers).forEach(key => req['headers'][key.toLowerCase()] = options.headers[key]);
        req['auth'] = options.auth;
        const body = options.body ? (options.body.length ? options.body : (req['headers']['content-type'] == 'application/json' ? JSON.stringify(options.body) : require('querystring').stringify(options.body))) : false;
        const thisReq = client.request(req, (res) => {
            let resBody = '';
            if(res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && options.followredirect != false){
                return resolve(fetch(res.headers.location, options));
            }
            res.on('data', (data) => resBody += data);
            res.on('end', (end) => resolve({
                headers: res.headers,
                status: res.statusCode,
                statusText: res.statusMessage,
                url: res.url || url,
                body: isJson(resBody) || resBody
            }));
            res.on('error', (err) => reject(err));
        });
        thisReq.setHeader('user-agent', 'fetch-lite[v1.0] (https://github.com/vasanthv/fetch-lite)');
        req['headers']['accept'] || thisReq.setHeader('accept', '*/*');
        req['headers']['content-type'] || thisReq.setHeader('content-type', (body && !Buffer.isBuffer(body)) ? 'application/x-www-form-urlencoded' : 'application/octet-stream');
        body && thisReq.setHeader('content-length', body.length);
        body && thisReq.write(body);
        thisReq.on('error', (err) => reject(err)).end();
    });
};


module.exports = (url, options) => url ? fetch(url, options || {}) : Promise.reject('URL is mandatory');