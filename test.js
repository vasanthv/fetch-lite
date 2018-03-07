const fetch = require('./');

const assert = require('assert');

const imageAsBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAq1BMVEUAAAD/zE3/zE3/zE3/zE3/zE3/zE3/zE3/zE3/zE3/zE3/zE3/zE3/zE3/zE0pLzMpLzNfVjpfVjo2OTUpLzOHdD6UfkCvkUPKpUcpLzMpLzMpLzNRTDgpLzOUfkB/bj1/bj3kuEpEQzZsYDvXr0jywkuhh0K8m0V5aj2DXg55VgrZqjpmRQCfeB3su0P1xEhwTQWziSe8kSvisz+pgCLGmTCMZxPPojWWbxjDVTyWAAAAIXRSTlMAIGCPv9//AFCf70CvgM8gYL//////////cADf/++fnwCswMQuAAACf0lEQVR4AazV3XLaMBBA4ZVtHWwlkEYCQylp+TPk/Z+wROPJ1DBaDNV3vXNWliZEFKYoK0vPVmVhJmkySagbyw3b1I+FTOlIcKUZHXp5RfX6MipkGu5qzP3Q1DGCm94JmRkjzYwWqh2juTodmvKQaSrU8KBmGBrf0UoyvqOXZMz9KKbXoZon1cOQcTzJmUFoxtNmfUi/oPHXJOM/TPu4GHr78e59mA947xftcsXAatkuvPfDyeD9+8+39VrW61/ztM2lFy38Rhn7iKF5BjH0kSv0O/xvJvzZbmW7dbuNOrY/HPbqwObovl6thk4rnQBO2qIO6kuoAc7KOiJl1RJoLiELdOmxBVGbntgBdiJGXxj3qWcOABgpAPhMzh0B9cwegEJK1MsM9JIP1wJQSgXAMTV2APQzrwCoxBIF5Yr0SyKyoi8MHT2CfmTRF37yrdWPLOplhh3fuqAeWdSFJ/6xTL3ZMMRG/bDErn13G+r89amXXDmHm797bkNwbP2+b/hDe+64dW4Pvq/t/eIMw1AOYsnCSkUWlZRkUUpBFoUYsjAysWRg449/Bk38dzT0txUzxo0YhoFgp+ZeYmooy7JPuv+/LIiSJgQtIwDnAduQxexuktMDWTbrbd82YpxGQEtasCuIMZupNeYBMlCP/TbmqEA2x59B9m4NoOqZHIpWgGZv9mNstp4pk60Vk9I2JmoL3K/6vZKfBKItz7QzNxXwc9JrBnnSf7HgcvT/VkbfFR/q25HRhR6Xjksvjh6vhX0IFmQ8CLtv2uPDHz7jxrKfS80+ji4A0q+x+6UmvmZFF7+4KhpXjuPqetyAEDdpxI0sgbNP3BAVNo0FjHWWf82HXyeF45SNwW2sAAAAAElFTkSuQmCC';
const buffer = Buffer.from("Hello World");

const assertEq = (res, testVal) => assert.equal(res, testVal);
const assertDeepEq = (res, testVal) => assert.deepEqual(res, testVal);
const breakWithErr = (err) => {
    console.error(err);
    process.exit(1);
};

/**
 * GET
 */
fetch('http://httpbin.org/get')
.then(response => assertEq(response.status, 200))
.catch(err => breakWithErr(err));


const getWithParams = {r:'1', hello: 'World'};
fetch('http://httpbin.org/get?hello=World&r=1')
.then(response => assertDeepEq(response.body.args, getWithParams))
.catch(err => breakWithErr(err));

/**
 * POST
 */
const postFormData = {hello:'world'};
fetch('http://httpbin.org/post', {
    method: 'POST',
    body: {
        hello: 'world'
    }
})
.then(response => assertDeepEq(response.body.form, postFormData))
.catch(err => breakWithErr(err));

const postJSON = {hello:'world'};
fetch('http://httpbin.org/post', {
    method: 'POST',
    body: {
        hello: 'world'
    },
    headers: {
        'content-type': 'application/json'
    }
})
.then(response => assertDeepEq(response.body.json, postJSON))
.catch(err => breakWithErr(err));

const postBufferData = 'Hello World';
fetch('http://httpbin.org/post', {
    method: 'POST',
    body: buffer
})
.then(response => assertDeepEq(response.body.data, postBufferData))
.catch(err => breakWithErr(err));

fetch('http://httpbin.org/post', {
    method: 'POST',
    body: {
        image: imageAsBase64
    }
})
.then(response => assertDeepEq(response.body.form, {image: imageAsBase64}))
.catch(err => breakWithErr(err));

/**
 * PUT
 */
fetch('http://httpbin.org/put', {
    method: 'PUT',
    body: {
        hello: 'world'
    },
    headers: {
        'content-type': 'application/json'
    }
})
.then(response => assertDeepEq(response.body.json, postJSON))
.catch(err => breakWithErr(err));

/**
 * DELETE
 */
fetch('http://httpbin.org/delete', {
    method: 'DELETE'
})
.then(response => assertEq(response.status, 200))
.catch(err => breakWithErr(err));

/**
 * HEAD
 */
fetch('http://httpbin.org/headers', {
    method: 'HEAD'
})
.then(response => assertEq(response.status, 200))
.catch(err => breakWithErr(err));

/**
 * REDIRECT
 */
fetch('http://httpbin.org/redirect-to?url=http%3A%2F%2Fhttpbin.org%2Fget')
.then(response => assertEq(response.status, 200))
.catch(err => breakWithErr(err));

fetch('http://httpbin.org/redirect-to?url=http%3A%2F%2Fhttpbin.org%2Fget', {
    followredirect: false
})
.then(response => assertEq(response.status, 302))
.catch(err => breakWithErr(err));

/**
 * HTTPS
 */
fetch('https://httpbin.org/get')
.then(response => assertEq(response.status, 200))
.catch(err => breakWithErr(err));

/**
 * ASYNC/AWAIT
 */
(async () => {
    const response = await fetch('https://httpbin.org/get');
    assertEq(response.status, 200);
})();

/**
 * Basic Auth
 */
fetch('https://httpbin.org/basic-auth/user/passwd', {
    auth: "user:passwd"
})
.then(response => assertEq(response.status, 200))
.catch(err => breakWithErr(err));

