// const supertest = require("supertest");
// const server = supertest.agent('http://localhost:3000');

// describe('GET /users', () => {
//   let result = null;
//   const testParams = [{
//     account: 'test01',
//     password: 'test01',
//     givenName: 'John',
//     familyName: 'Doe',
//     email: 'test01@siliconcube.co.kr',
//     phone: '010-0000-0000',
//   }];

//   it('create user', async (done) => {
//     server.post('/users', testParams[0]).expect('Content-Type', /json/).expect(201).end((err, res) => {
//       if(res.body) {
//         console.log(res.body);
//         return done();
//       }
//     });
//     return done();
//   });

//   it('find user', async (done) => {
//     server.get(`/users/account/${testParams[0].account}`).expect('Content-Type', /json/).expect(200).end((err, res) => {
//       if(res.body) {
//         console.log(res.body);
//         return done();
//       }
//     });

//     return done();
//   })
// });
