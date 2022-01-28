// /* tslint:disable:no-unused-expression no-var-requires */
// import * as chai from 'chai'
// import { expect } from 'chai'
// import 'mocha'
// import * as sinon from 'sinon'
// import * as sinonChai from 'sinon-chai'
// import { mockReq, mockRes } from 'sinon-express-mock'
// import { CASE_ALLOCATOR_ROLE, LEGAL_OPS_TYPE } from './constants'
// import { getUserDetails, getUserRoleAssignments } from './index'

// chai.use(sinonChai)
// describe('getUserDetails', () => {

//     let sandbox
//     let next
//     let req
//     let res

//     beforeEach(() => {
//         sandbox = sinon.createSandbox()
//         next = sandbox.spy()
//         res = mockRes()
//     })

//     afterEach(() => {
//         sandbox.restore()
//     })

//     it('should return a true response when case share permission is existent', async () => {
//       const reqQuery = {
//         session: {
//           passport: {
//             user: {
//               tokenset: {
//                 accessToken: '124'
//               },
//               userinfo: {
//                 roles: ['pui-case-manager'],
//               },
//             },
//           },
//         },
//       }
//       req = mockReq(reqQuery)
//       await getUserDetails(req, res, next)
//       const response = {
//         canShareCases: true,
//       }
//       expect(res.send).to.have.been.calledWith(sinon.match(response))
//     })

//     it('should return a false response when case share permission is non-existent', async () => {
//       const reqQuery = {
//         session: {
//           passport: {
//             user: {
//               tokenset: {
//                 accessToken: '124'
//               },
//               userinfo: {
//                 roles: ['dummy'],
//               },
//             },
//           },
//         },
//       }
//       req = mockReq(reqQuery)
//       await getUserDetails(req, res, next)
//       const response = {
//         canShareCases: false
//       }
//       expect(res.send).to.have.been.calledWith(sinon.match(response))
//     })

//     it('should catch an error', async () => {
//       const reqQuery = {
//         session: {
//           passport: {
//             user: {
//               tokenset: {
//                 accessToken: '124'
//               },
//               userinfo: {
//                 roles: [],
//               },
//             },
//           },
//         },
//       }
//       req = mockReq(reqQuery)
//       res.send.throws()

//       await getUserDetails(req, res, next)

//       expect(next).to.have.been.calledWith()
//     })
// });

// // describe('getUserRoleAssignments', async () => {

// //     it('use session', async () =>  {
// //     const userInfo = {
// //       forename: 'foreName',
// //       surname: 'surName',
// //       email: 'email@email.com',
// //       active: true,
// //       id: '223',
// //       uid: '223',
// //       roles: ['role1', 'role3']
// //     };

// //     const req = {
// //       session: {
// //         roleAssignmentResponse: [
// //           {
// //             id: '478c83f8-0ed0-4651-b8bf-cd2b1e206ac2',
// //             actorIdType: 'IDAM',
// //             actorId: 'c5a983be-ca99-4b8a-97f7-23be33c3fd22',
// //             roleType: 'ORGANISATION',
// //             roleName: CASE_ALLOCATOR_ROLE,
// //             classification: 'PUBLIC',
// //             grantType: 'STANDARD',
// //             roleCategory: LEGAL_OPS_TYPE,
// //             readOnly: false,
// //             created: Date.UTC.toString(),
// //             attributes: {
// //               primaryLocation: '231596',
// //               jurisdiction: 'IA'
// //             }
// //           }
// //         ]
// //       }
// //     };
// //     const locationInfo = await getUserRoleAssignments(userInfo, req);
// //     expect(locationInfo[0].primaryLocation).to.equal('231596');
// //     expect(locationInfo[0].isCaseAllocator).to.equal(true);
// //   });
// // });
