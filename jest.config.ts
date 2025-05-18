import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  setupFilesAfterEnv: ["./src/tests/setup.ts"],
  coverageProvider: "v8",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/web/middlewares/**",
    "!src/web/schemas/**",
    "!src/domain/**",
    "!src/@types/**",
    "!src/swagger.json",
    "!src/swagger.ts",
    "!src/app.ts",
    "!src/server.ts",
  ],
};

export default config;
