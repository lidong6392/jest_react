module.exports = {
  // 运行测试前准备文件: 引入 polyfill 解决 jsdom 的兼容性问题
  setupFiles: ['react-app-polyfill/jsdom'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.ts'],
  // 创建测试运行环境: 在 node 环境下模拟浏览器环境
  testEnvironment: 'jest-environment-jsdom-fourteen',
  // 测试文件扩展
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  // 是否清除之前用例的mock记录
  clearMocks: true,
  // 生成覆盖率报告文件目录
  coverageDirectory: "coverage",
  collectCoverageFrom: [],
  // 覆盖率阈值
  coverageThreshold: {
    global: { branches: 60, unctions: 60, lines: 60, statements: 60 },
  },
  // 转码时需要忽略的文
  transformIgnorePatterns: [ "\\\\node_modules\\\\"],
  // 测试超时时间
  testTimeout: 60000,
  // watch 模式的插件
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  // 别名配置
  moduleNameMapper: {
    '\\.(css|less|svg|jpg|png|less)$': 'identity-obj-proxy',
    '^@apis/(.*)$': '<rootDir>/app/apis/$1',
    '^@components/(.*)$': '<rootDir>/app/components/$1',
    '@ajax': '<rootDir>/app/configs/ajax.js',
    '@actions/(.*)$': '<rootDir>/app/redux/actions/$1',
    '@configs/(.*)$': '<rootDir>/app/configs/$1',
    '@images/(.*)$': '<rootDir>/app/images/$1',
    '@middleware/(.*)$': '<rootDir>/app/middleware/$1',
    '@pages/(.*)$': '<rootDir>/app/pages/$1',
    '@styles/(.*)$': '<rootDir>/app/styles/$1',
    '@reducers/(.*)$': '<rootDir>/app/redux/reducers/$1',
    '@reducers': '<rootDir>/app/redux/reducers/index.js',
    '@config': '<rootDir>/app/configs/config.js',
    '@reg': '<rootDir>/app/configs/regular.config.js',
    '@tableList': '<rootDir>/app/components/tableList/tableList.js'
  },
};
