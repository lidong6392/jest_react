/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "\\\\node_modules\\\\"
  ],
  moduleFileExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx",
   ],
  roots: null,

  moduleNameMapper: {
    //'^@/(.*)$': '<rootDir>/app/$1',
    '^@apis/(.*)$': '<rootDir>/app/apis/$1',
    '^@components/(.*)$': '<rootDir>/app/components/$1',
    '@ajax': '<rootDir>/app/configs/ajax.js',
    '@config': '<rootDir>/app/configs/config.js',
    '@reg': '<rootDir>/app/configs/regular.config.js',
    '@tableList': '<rootDir>/app/components/tableList/tableList.js',

    '\\.(css|less|svg|jpg|less)$': 'identity-obj-proxy',
    // 'root/node_modules/ci-info/vendors.json':  '<rootDir>/__mocks__/vendors.json'
  },

  testPathIgnorePatterns: [
    "\\\\node_modules\\\\"
  ],

  transformIgnorePatterns: [
    "\\\\node_modules\\\\"
  ],

  // 运行测试前准备文件: 引入 polyfill 解决 jsdom 的兼容性问题
  setupFiles: ['react-app-polyfill/jsdom'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.ts'],
  // 创建测试运行环境: 在 node 环境下模拟浏览器环境
  testEnvironment: 'jest-environment-jsdom-fourteen',
  // testEnvironment: 'node',
  // 测试覆盖率收集范围: src 下所有的 js jsx ts tsx
  collectCoverageFrom: [
    // 'src/**/*.{js,jsx,ts,tsx}',
    // '!src/**/*.d.ts',
    // '!src/index.tsx',
    // '!src/serviceWorker.ts'
  ],
  // 覆盖率阈值
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    },
  },
  testTimeout: 60000,
  // watch 模式的插件
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
