
module.exports = {
    configureWebpack: {
        devtool: 'source-map',
    },
    pluginOptions: {
        jest: {
            // Jest-specific configuration
            testMatch: ['**/tests/unit/**/*.spec.js'], // Custom test match pattern
            collectCoverage: true, // Enable coverage collection
            collectCoverageFrom: ['src/**/*.{js,vue}', '!src/main.js'], // Define files to collect coverage from
            coverageReporters: ['html', 'text-summary'], // Define the coverage reporters
            moduleFileExtensions: ['js', 'json', 'vue'], // Extensions Jest should recognize
            transform: {
                '^.+\\.vue$': 'vue-jest', // Use vue-jest to process .vue files
                '^.+\\.js$': 'babel-jest', // Use babel-jest to process JavaScript files
            },
            snapshotSerializers: ['jest-serializer-vue'], // Serializer for Vue snapshots
        },
    },
};
