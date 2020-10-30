import * as Mocha from 'mocha';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// tunnel.init();

export const mocha = new Mocha({
     ui: 'tdd',
    // reporter: 'spec',
   // bail: 'yes',
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'reports/tests/api_functional/',
        reportName: 'XUI_MC_Integration_tests'
    },
    enableTimeouts: false
});

// mocha.addFile('test/integration/tests/utils/setup_axios.ts');
// mocha.addFile('test/integration/tests/nodeApp_endpoints.ts');
// mocha.addFile('test/integration/tests/ccd_endpoints.ts');
mocha.addFile('test/integration/tests/temp.ts');


mocha.run( (failures) => {
    console.log(failures);
    process.exitCode = failures ? 1 : 0; // exit with non-zero status if there were failures
});
