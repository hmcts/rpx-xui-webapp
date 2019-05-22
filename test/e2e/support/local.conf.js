const localConfig = [
    {
        browserName: 'chrome',
        acceptInsecureCerts: true,

        chromeOptions: {
          args: [
            '--headless',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-zygote '
          ]
        },
        proxy: {
            proxyType: 'manual',
            httpProxy: 'proxyout.reform.hmcts.net:8080',
            sslProxy: 'proxyout.reform.hmcts.net:8080',
            noProxy: 'localhost:3000'
        }
    }
];

module.exports = localConfig;
