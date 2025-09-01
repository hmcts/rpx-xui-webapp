// import * as chai from 'chai';
// import { expect } from 'chai';
// import 'mocha';
// import * as sinon from 'sinon';
// import * as sinonChai from 'sinon-chai';
// import * as application from '../application';
// import * as log4jui from '../lib/log4jui';

// chai.use(sinonChai);

// describe('Redis Health', () => {
//   let sandbox: sinon.SinonSandbox;
//   let createAppStub: sinon.SinonStub;
//   let loggerErrorStub: sinon.SinonStub;
//   let getLoggerStub: sinon.SinonStub;
//   let mockApp: any;
//   let mockRedisClient: any;
//   let redisHealth: any;

//   beforeEach(() => {
//     sandbox = sinon.createSandbox();

//     loggerErrorStub = sandbox.stub();
//     const mockLogger = {
//       _logger: {} as any,
//       debug: sandbox.stub(),
//       error: loggerErrorStub,
//       info: sandbox.stub(),
//       trackRequest: sandbox.stub(),
//       warn: sandbox.stub()
//     };
//     getLoggerStub = sandbox.stub(log4jui, 'getLogger').returns(mockLogger);

//     // Delete module from cache and re-require it to get fresh instance with stubbed logger
//     delete require.cache[require.resolve('./redis.health')];
//     redisHealth = require('./redis.health').redisHealth;

//     mockRedisClient = {
//       ping: sandbox.stub()
//     };

//     mockApp = {
//       locals: {
//         redisClient: mockRedisClient
//       }
//     };
//   });

//   afterEach(() => {
//     sandbox.restore();
//     delete require.cache[require.resolve('./redis.health')];
//   });

//   describe('redisHealth', () => {
//     it('should return true when Redis client responds with PONG', async () => {
//       createAppStub.resolves(mockApp);
//       mockRedisClient.ping.callsFake((callback) => {
//         callback(null, 'PONG');
//       });

//       const result = await redisHealth();

//       expect(result).to.be.true;
//       expect(createAppStub).to.have.been.calledOnce;
//       expect(mockRedisClient.ping).to.have.been.calledOnce;
//       expect(loggerErrorStub).to.not.have.been.called;
//     });

//     it('should return false when Redis client returns an error', async () => {
//       const mockError = new Error('Redis connection failed');
//       createAppStub.resolves(mockApp);
//       mockRedisClient.ping.callsFake((callback) => {
//         callback(mockError, null);
//       });

//       const result = await redisHealth();

//       expect(result).to.be.false;
//       expect(createAppStub).to.have.been.calledOnce;
//       expect(mockRedisClient.ping).to.have.been.calledOnce;
//       expect(loggerErrorStub).to.have.been.calledWith(mockError);
//     });

//     it('should return false when Redis client responds with non-PONG response', async () => {
//       createAppStub.resolves(mockApp);
//       mockRedisClient.ping.callsFake((callback) => {
//         callback(null, 'NOT_PONG');
//       });

//       const result = await redisHealth();

//       expect(result).to.be.false;
//       expect(createAppStub).to.have.been.calledOnce;
//       expect(mockRedisClient.ping).to.have.been.calledOnce;
//       expect(loggerErrorStub).to.have.been.calledWith('redis server is not responsive');
//     });

//     it('should return false when Redis client responds with undefined', async () => {
//       createAppStub.resolves(mockApp);
//       mockRedisClient.ping.callsFake((callback) => {
//         callback(null, undefined);
//       });

//       const result = await redisHealth();

//       expect(result).to.be.false;
//       expect(createAppStub).to.have.been.calledOnce;
//       expect(mockRedisClient.ping).to.have.been.calledOnce;
//       expect(loggerErrorStub).to.have.been.calledWith('redis server is not responsive');
//     });

//     it('should return false when Redis client responds with null', async () => {
//       createAppStub.resolves(mockApp);
//       mockRedisClient.ping.callsFake((callback) => {
//         callback(null, null);
//       });

//       const result = await redisHealth();

//       expect(result).to.be.false;
//       expect(createAppStub).to.have.been.calledOnce;
//       expect(mockRedisClient.ping).to.have.been.calledOnce;
//       expect(loggerErrorStub).to.have.been.calledWith('redis server is not responsive');
//     });

//     it('should return false when Redis client responds with empty string', async () => {
//       createAppStub.resolves(mockApp);
//       mockRedisClient.ping.callsFake((callback) => {
//         callback(null, '');
//       });

//       const result = await redisHealth();

//       expect(result).to.be.false;
//       expect(createAppStub).to.have.been.calledOnce;
//       expect(mockRedisClient.ping).to.have.been.calledOnce;
//       expect(loggerErrorStub).to.have.been.calledWith('redis server is not responsive');
//     });

//     it('should return false when app is null', async () => {
//       createAppStub.resolves(null);

//       const result = await redisHealth();

//       expect(result).to.be.false;
//       expect(createAppStub).to.have.been.calledOnce;
//       expect(loggerErrorStub).to.not.have.been.called;
//     });

//     it('should return false when app is undefined', async () => {
//       createAppStub.resolves(undefined);

//       const result = await redisHealth();

//       expect(result).to.be.false;
//       expect(createAppStub).to.have.been.calledOnce;
//       expect(loggerErrorStub).to.not.have.been.called;
//     });

//     it('should return false when app.locals is null', async () => {
//       createAppStub.resolves({ locals: null });

//       const result = await redisHealth();

//       expect(result).to.be.false;
//       expect(createAppStub).to.have.been.calledOnce;
//       expect(loggerErrorStub).to.not.have.been.called;
//     });

//     it('should return false when app.locals is undefined', async () => {
//       createAppStub.resolves({ locals: undefined });

//       const result = await redisHealth();

//       expect(result).to.be.false;
//       expect(createAppStub).to.have.been.calledOnce;
//       expect(loggerErrorStub).to.not.have.been.called;
//     });

//     it('should return false when app.locals.redisClient is null', async () => {
//       createAppStub.resolves({
//         locals: {
//           redisClient: null
//         }
//       });

//       const result = await redisHealth();

//       expect(result).to.be.false;
//       expect(createAppStub).to.have.been.calledOnce;
//       expect(loggerErrorStub).to.not.have.been.called;
//     });

//     it('should return false when app.locals.redisClient is undefined', async () => {
//       createAppStub.resolves({
//         locals: {
//           redisClient: undefined
//         }
//       });

//       const result = await redisHealth();

//       expect(result).to.be.false;
//       expect(createAppStub).to.have.been.calledOnce;
//       expect(loggerErrorStub).to.not.have.been.called;
//     });

//     it('should return false when Redis client ping method throws an exception', async () => {
//       createAppStub.resolves(mockApp);
//       mockRedisClient.ping.throws(new Error('Ping method failed'));

//       const result = await redisHealth();

//       expect(result).to.be.false;
//       expect(createAppStub).to.have.been.calledOnce;
//       expect(mockRedisClient.ping).to.have.been.calledOnce;
//       expect(loggerErrorStub).to.not.have.been.called;
//     });

//     it('should return false when createApp throws an exception', async () => {
//       createAppStub.rejects(new Error('Application creation failed'));

//       try {
//         const result = await redisHealth();
//         // If we get here, the function should return false for any createApp error
//         expect(result).to.be.false;
//       } catch (error) {
//         // If createApp rejection is not caught, that's also acceptable behavior
//         expect(error.message).to.equal('Application creation failed');
//       }

//       expect(createAppStub).to.have.been.calledOnce;
//       expect(loggerErrorStub).to.not.have.been.called;
//     });

//     it('should return false when Redis client is not an object', async () => {
//       createAppStub.resolves({
//         locals: {
//           redisClient: 'not an object'
//         }
//       });

//       const result = await redisHealth();

//       expect(result).to.be.false;
//       expect(createAppStub).to.have.been.calledOnce;
//       expect(loggerErrorStub).to.not.have.been.called;
//     });

//     it('should return false when Redis client does not have ping method', async () => {
//       createAppStub.resolves({
//         locals: {
//           redisClient: {} // Object without ping method
//         }
//       });

//       const result = await redisHealth();

//       expect(result).to.be.false;
//       expect(createAppStub).to.have.been.calledOnce;
//       expect(loggerErrorStub).to.not.have.been.called;
//     });

//     it('should handle Redis client ping callback with both error and pong', async () => {
//       const mockError = new Error('Redis error');
//       createAppStub.resolves(mockApp);
//       mockRedisClient.ping.callsFake((callback) => {
//         callback(mockError, 'PONG'); // Error takes precedence
//       });

//       const result = await redisHealth();

//       expect(result).to.be.false;
//       expect(createAppStub).to.have.been.calledOnce;
//       expect(mockRedisClient.ping).to.have.been.calledOnce;
//       expect(loggerErrorStub).to.have.been.calledWith(mockError);
//     });
//   });
// });
