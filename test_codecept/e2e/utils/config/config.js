
class config {

    constructor() {
        const config = {
            baseUrl: this.getBaseUrl()
        };
    }
    getBaseUrl() {
        let baseurl = process.env.TEST_URL ? process.env.TEST_URL : 'https://manage-case.aat.platform.hmcts.net/';

        if (!baseurl.endsWith('/')) {
            baseurl += '/';
        }
        return baseurl;
    }

}
module.exports = new config();

