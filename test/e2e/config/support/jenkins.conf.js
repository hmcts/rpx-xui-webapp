const jenkinsConfig = [
    {
        browserName: 'chrome',
        acceptInsecureCerts: true,
        nogui: true,
        chromeOptions: {
          args: [
            '--headless',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-zygote ',
            '--disableChecks'
           ]
        }
    }
];

module.exports = jenkinsConfig;
