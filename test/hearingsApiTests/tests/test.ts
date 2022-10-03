process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import * as Mocha from 'mocha';

const mocha = new Mocha({
    ui: 'tdd',
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'reports/tests/hearings_api_functional/',
        reportName: 'XUI_Hearings_Integration_tests'
    }
});
mocha.addFile('test/hearingsApiTests/tests/get_prd_caseflags.ts');
mocha.addFile('test/hearingsApiTests/tests/get_Hearings.ts');
// mocha.addFile('test/hearingsApiTests/tests/amend_Hearings.ts');
mocha.addFile('test/hearingsApiTests/tests/delete_Hearings.ts');
mocha.run( (failures) => {
    process.exitCode = failures ? 1 : 0; // exit with non-zero status if there were failures
});
