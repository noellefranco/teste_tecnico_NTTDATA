export default {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.js", "!src/prismaClient.js"],
  verbose: true,
};
