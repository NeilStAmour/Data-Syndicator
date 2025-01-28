/** @jest-config-loader ts-node */

import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node", // Use "jsdom" for browser-like testing
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["**/__tests__/**/*.test.ts"], // Define where your test files are located
  collectCoverage: true, // Optional: enable coverage reports
  testPathIgnorePatterns: [".d.ts", ".js"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};

export default config;
