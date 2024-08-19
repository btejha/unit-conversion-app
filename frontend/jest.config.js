module.exports = {

    //preset: '@vue/cli-plugin-unit-jest/presets/no-babel', // Use Vue CLI preset
    preset: '@vue/cli-plugin-unit-jest',
    testEnvironment: 'jsdom', // Required for Vue component testing
    moduleFileExtensions: ['js', 'vue', 'json', 'jsx', 'ts', 'tsx'],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: ['**/tests/**/*.test.js'],
    collectCoverage: true,
    coverageReporters: ['html', 'text'],
};
