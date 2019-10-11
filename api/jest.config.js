module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageReporters: [
        "lcov",
        "html",
        "text-summary"
    ],
    coverageDirectory: '../reports/tests/coverage/node'
};
