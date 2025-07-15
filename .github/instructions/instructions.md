## Context
I need to improve unit test coverage for functionality in the work-allocation module. I have several test files with 100% coverage that demonstrate our testing best practices and patterns using Mocha, Chai, and Sinon.

## Example Files with 100% Coverage
- `src/api/accessManagement/index.spec.ts`
- `src/api/accessManagement/routes.spec.ts`
- `src/api/amendedJurisdictions/index.spec.ts`
- `src/api/hearings/hmc.index.spec.ts`
- `src/api/hearings/routes.spec.ts`
- `src/api/hearings/services.index.spec.ts`

## Testing Requirements
Please help me write comprehensive unit tests following these patterns:

### 1. Test Structure
- Use Mocha's describe/it block structure as shown in the example files
- Group related tests in nested describe blocks
- Use clear, descriptive test names that explain what is being tested
- Follow the pattern: `describe('ServiceName', () => { describe('methodName', () => { it('should...', () => {}) }) })`

### 2. Coverage Goals
- Achieve as close to 100% statement, branch, function, and line coverage
- Test all edge cases, error scenarios, and boundary conditions
- Include tests for:
  - Happy path scenarios
  - Error handling (4xx, 5xx responses)
  - Null/undefined inputs
  - Empty arrays/objects
  - All conditional branches (if/else, switch cases)
  - Promise rejections and error propagation
  - Request/response transformations

### 3. Testing Patterns to Follow (Mocha/Chai/Sinon Specific)
```typescript
import { expect } from 'chai';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
```

- Use `sinon.stub()` for mocking dependencies
- Use `sinon.sandbox.create()` for easy cleanup
- Use `mockReq()` and `mockRes()` for Express request/response objects
- Mock axios/http calls with `sinon.stub(http, 'get').resolves()`
- Use `chai.expect()` for assertions
- Restore stubs in `afterEach()` blocks

### 4. Specific Requirements for API Tests
- **Express Middleware**: Test req, res, next patterns
- **HTTP Calls**: Mock external service calls with sinon stubs
- **Error Handling**: Test error middleware with various error types
- **Authentication**: Mock auth tokens and user sessions
- **Data Transformation**: Test request/response data mapping
- **Async Operations**: Use async/await or return promises
- **Logger Mocking**: Stub logger calls to avoid console output

### 5. Common Patterns
```typescript
describe('ServiceName', () => {
  let sandbox: sinon.SinonSandbox;
  let req: any;
  let res: any;
  let next: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq();
    res = mockRes();
    next = sandbox.stub();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('methodName', () => {
    it('should handle successful response', async () => {
      // Arrange
      const mockData = { /* test data */ };
      sandbox.stub(http, 'get').resolves({ data: mockData });
      
      // Act
      await serviceMethod(req, res, next);
      
      // Assert
      expect(res.send).to.have.been.calledWith(mockData);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should handle errors', async () => {
      // Arrange
      const error = new Error('Test error');
      sandbox.stub(http, 'get').rejects(error);
      
      // Act
      await serviceMethod(req, res, next);
      
      // Assert
      expect(next).to.have.been.calledWith(error);
    });
  });
});
```

## Target File
I'm currently working on: api/noc/nocService.ts

## Additional Context
- We use Mocha as test runner, Chai for assertions, and Sinon for mocking
- The API uses Express.js
- Focus on testing Express middleware patterns (req, res, next)
- Mock all external HTTP calls and database operations
- Test error propagation through the next() function
- Ensure proper status codes are returned
- Mock logger to avoid test output noise

## Manage Case Specific Requirements
- Test case filtering and search query building
- Mock CCD (Case Management) API responses
- Test role-based access controls (case-manager, judicial roles)
- Test case assignment operations
- Mock work allocation service responses
- Test caching mechanisms where applicable

---

When writing tests, please:
1. Import all necessary testing libraries (chai, sinon, sinon-express-mock)
2. Set up comprehensive test data that matches actual API responses
3. Create a sinon sandbox for easy stub management
4. Mock all external dependencies (http calls, database, logger)
5. Test both successful and error scenarios for each endpoint
6. Verify correct HTTP status codes and response formats
7. Test request validation and error messages
8. Clean up all stubs in afterEach blocks
9. Add comments explaining complex mocking scenarios