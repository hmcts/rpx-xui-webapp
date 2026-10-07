const nodeProcess = globalThis.process;
const nodeConsole = globalThis.console;

class PactMockApp {
  serverPort = 8080;

  server = null;

  constructor() {
    this.resetRoutes();
  }

  resetRoutes() {
    this.routes = {
      get: new Map(),
      post: new Map(),
      put: new Map(),
      delete: new Map(),
    };
  }

  init() {
    this.resetRoutes();
    return 'done';
  }

  setServerPort(port) {
    this.serverPort = Number(port) || 8080;
  }

  onGet(path, handler) {
    this.routes.get.set(path, handler);
  }

  onPost(path, handler) {
    this.routes.post.set(path, handler);
  }

  onPut(path, handler) {
    this.routes.put.set(path, handler);
  }

  onDelete(path, handler) {
    this.routes.delete.set(path, handler);
  }

  async startServer() {
    if (this.server) {
      return;
    }

    const { default: express } = await import('express');
    const app = express();
    app.disable('x-powered-by');
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    for (const [path, handler] of this.routes.get.entries()) {
      app.get(path, handler);
    }

    for (const [path, handler] of this.routes.post.entries()) {
      app.post(path, handler);
    }

    for (const [path, handler] of this.routes.put.entries()) {
      app.put(path, handler);
    }

    for (const [path, handler] of this.routes.delete.entries()) {
      app.delete(path, handler);
    }

    app.use((req, res) => {
      res.status(404).send({ message: `No mock route registered for ${req.method} ${req.path}` });
    });

    await new Promise((resolve) => {
      this.server = app.listen(this.serverPort, resolve);
    });
  }

  stopServer() {
    if (!this.server) {
      return;
    }

    this.server.close();
    this.server = null;
  }
}

const mockApp = new PactMockApp();

if (this && typeof this === 'object') {
  Object.setPrototypeOf(this, PactMockApp.prototype);
  Object.assign(this, mockApp);
}

const processArgv = Array.isArray(nodeProcess?.argv) ? nodeProcess.argv : [];
const isDirectRun = typeof processArgv[1] === 'string' && processArgv[1].includes('pact-mocks/app.js');

if (isDirectRun) {
  const portArg = nodeProcess.argv[2];
  mockApp.setServerPort(portArg || nodeProcess.env.PORT || 8080);
  mockApp.init();
  mockApp.startServer().then(() => {
    nodeConsole.log(`[PACT_MOCK] Running on port ${mockApp.serverPort}`);
  });
}
