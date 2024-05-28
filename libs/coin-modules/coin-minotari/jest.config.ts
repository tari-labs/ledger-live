export default {
  collectCoverageFrom: ["src/**/*.ts"],
  testRegex: ".test.ts$",
  collectCoverage: true,
  coverageDirectory: "coverage",
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["lib/", "lib-es/"],
};
