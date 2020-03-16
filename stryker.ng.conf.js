module.exports = function (config) {
    config.set({
        mutate: ["src/**/*.ts", "!src/**/*.spec.ts"],
        mutator: 'typescript',
        // transpilers: [
        //     'typescript'
        // ],
        testFramework: "jasmine",
        // testRunner: "karma",
        testRunner: "command",


        commandRunner: {
            command: 'ng test' // optionally choose a different command to run
        },
        reporters: ["clear-text", "progress", "html"],
        tsconfigFile: 'tsconfig.json',
        karma: {
            projectType: 'angular-cli',
            // projectType:'custom',
           
           configFile: 'src/karma.conf.js',
           
            ngConfig: {
                browsers: ['HeadlessChrome'],
                customLaunchers: {
                    HeadlessChrome: {
                        base: 'ChromeHeadless',
                        flags: ['--no-sandbox']
                    }
                }
                }
            
        },
        htmlReporter: {
            baseDir: 'reports/mutation/html/ng/'
        },
        "max-concurrent-test-runners": 4

    });
}