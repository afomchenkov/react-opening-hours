module.exports = {
  globals: {
    "ts-jest": {
      isolatedModules: false,
    },
  },
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/*.(test|spec).(ts|tsx)"],
  testEnvironment: "jsdom",
};
