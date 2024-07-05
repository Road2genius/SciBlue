import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.spec.ts"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
};

export default config;
