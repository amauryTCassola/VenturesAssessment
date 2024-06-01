module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  },
  testMatch: ['**/*.test.(ts|tsx)'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react-jsx',
      },
    },
  },
};