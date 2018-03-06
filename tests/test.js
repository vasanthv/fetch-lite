const fetch = require('../');

const fs = require('fs');
const path = require('path');
const imageAsBase64 = fs.readFileSync(path.join(__dirname, 'coolpic.png'), 'base64');

const bu = new Buffer("Hello World");
// console.log(Buffer.isBuffer(imageAsBase64));

//data:image/png;base64,

// //http://davidwalsh.name/css -> 301

// describe('fetch() test cases', function() {
//     describe('isValidHandle', function() {
//         const validHandles = ['vasanth', 'vasanth87', 'vasanth_87', 'Vasanth_87'];
//         const invalidHandles = ['', 'vasanthv879', 'v@santh', 'va$anth', 'vasanth-87'];

//         validHandles.forEach((handle) => {
//             it('should be a valid handle '+handle, async function() {
//                 const username = await util.isValidHandle(handle);
//                 username.should.equal(handle.toLowerCase());
//             });
//         });
//         invalidHandles.forEach((handle) => {
//             it('should be an invalid handle '+handle, async function() {
//                 try{
//                     const response = await util.isValidHandle(handle);
//                     should.not.exist(response);
//                 }catch (error){
//                     error.should.have.property('error');
//                     error.error.should.equal(400);
//                 }
//             });
//         });
//     });
// });

fetch('http://localhost:8080', {
    method: 'POST',
    headers: {
        "Accept": "application/json",
    },
    body: 'data:image/png;base64,'+imageAsBase64
})
.then(response => console.log(response))
.catch(error => {
    console.log('----------');
    console.error(error)
    console.log('----------');
});
