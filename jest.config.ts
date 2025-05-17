import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  coverageProvider: "v8",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/middlewares/**",
    "!src/schemas/**",
    "!src/exceptions/**",
    "!src/types/**",
    "!src/swagger.json",
    "!src/swagger.ts",
  ],
};

export default config;
