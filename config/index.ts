/**
 * Client-side application settings for the local development environment.
 */
export const local = {
  // Core application settings
  app: {
    name: "React App",
    origin: "http://localhost:3000",
    env: "local" as "local" | "test" | "prod",
  },
  // GraphQL API and OAuth endpoint(s)
  // https://github.com/kriasoft/node-starter-kit
  api: {
    origin: "https://us-central1-kriasoft.cloudfunctions.net",
    prefix: "/reactstarter", // Cloud Function URL pathname
    path: "/api",
  },
};

/**
 * Client-side application settings for the test / QA environment.
 */
export const test: typeof local = {
  app: {
    ...local.app,
    origin: "https://test.example.com",
    env: "test",
  },
  api: {
    ...local.api,
    origin: "https://us-central1.example-test.cloudfunctions.net",
  },
};

/**
 * Client-side application settings for the production environment.
 */
export const prod: typeof local = {
  app: {
    ...local.app,
    origin: "https://example.com",
    env: "prod",
  },
  api: {
    ...local.api,
    origin: "https://us-central1.example.cloudfunctions.net",
  },
};

export type Config = typeof local;
export default { local, test, prod };
