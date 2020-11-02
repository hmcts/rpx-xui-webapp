import { expect } from 'chai';
import { v4 as  uuid } from 'uuid';
// import mocha from 'mocha';
import { config } from './config/config';
import { getUserId, getXSRFToken } from './utils/authUtil';
// import { mocha } from './test';
import Request from './utils/request';



describe('Evidence Manager Endpoints', () => {
    const userName = 'lukesuperuserxui@mailnesia.com';
    const password = 'Monday01';

    // const userName = 'peterxuisuperuser@mailnesia.com';
    // const password = 'Monday01';
    beforeEach(() => {
        Request.clearSession();
    });

    // tslint:disable-next-line: only-arrow-functions
    it('Get document binary', async function() {
        this.timeout(60000);
        await Request.withSession(userName, password);
        const xsrfToken = await getXSRFToken(userName, password);
        const headers = {
            experimental: true,
            'X-XSRF-TOKEN': xsrfToken
        };
        const response = await Request.get(`documents/${config.em.docId}/binary`, headers);
        expect(response.status).to.equal(200);
    });

    it('Get document annotations metadata', async  () =>  {
        await Request.withSession(userName, password);
        const xsrfToken = await getXSRFToken(userName, password);
        const headers = {
            experimental: true,
            'X-XSRF-TOKEN': xsrfToken
        };
        const response = await Request.get(`em-anno/metadata/${config.em.docId}`, headers);
        expect(response.status).to.equal(204);
    });

    it('Get document annotations filter', async () => {
        await Request.withSession(userName, password);
        const xsrfToken = await getXSRFToken(userName, password);
        const headers = {
            experimental: true,
            'X-XSRF-TOKEN': xsrfToken
        };
        const response = await Request.get(`em-anno/annotation-sets/filter?documentId=${config.em.docId}`, null);
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('createdBy');
        expect(response.data).to.have.property('createdByDetails');
        expect(response.data).to.have.property('lastModifiedByDetails');
        expect(response.data).to.have.property('createdDate');
        expect(response.data).to.have.property('lastModifiedBy');
        expect(response.data).to.have.property('annotations');
        expect(response.data).to.have.property('documentId');
        expect(response.data).to.have.property('id');
    });

    it('Get document bookmarks', async () => {
        await Request.withSession(userName, password);
        const xsrfToken = await getXSRFToken(userName, password);
        const headers = {
            experimental: true,
            'X-XSRF-TOKEN': xsrfToken
        };
        const response = await Request.get(`em-anno/${config.em.docId}/bookmarks`, null);
        console.log(response.data);
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('array');

        expect(response.data[0]).to.have.all.keys('id', 'name', 'documentId', 'createdBy', 'pageNumber', 'xCoordinate', 'yCoordinate', 'parent', 'previous'); 
        expect(response.data[0].documentId).to.equal(config.em.docId);
    });

    it('Put document bookmark', async () => {
        await Request.withSession(userName, password);

        const xsrfToken = await getXSRFToken(userName, password);
        const headers = {
            'X-XSRF-TOKEN': xsrfToken
        };

        const bookmarksCountBefore = await Request.get(`em-anno/${config.em.docId}/bookmarks`, null);

        const response = await Request.put(`em-anno/bookmarks`, await getNewBookmarkIdObject('test123', config.em.docId, 0, null), headers);
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('object');
        expect(response.data).to.have.all.keys('id', 'name', 'documentId', 'createdBy', 'pageNumber', 'xCoordinate', 'yCoordinate', 'parent', 'previous');
        expect(response.data.documentId).to.equal(config.em.docId);

    });

    it('Delete document bookmark', async () => {
        await Request.withSession(userName, password);
        const xsrfToken = await getXSRFToken(userName, password);
        const headers = {
            'X-XSRF-TOKEN': xsrfToken
        };
        const bookmarksgetResponse = await Request.get(`em-anno/${config.em.docId}/bookmarks`, null);
        let bookMarkIdToDelete = '';
        if (bookmarksgetResponse.data.length <= 1 ) {
            const createBookmarkResponse = await Request.put(`em-anno/bookmarks`, await getNewBookmarkIdObject('test123', config.em.docId, 0, null), headers);
            bookMarkIdToDelete = createBookmarkResponse.data.id;
        } else {
            bookMarkIdToDelete = bookmarksgetResponse.data[0].id;
        }

        const bookMarkDeleteResponse = await Request.delete(`em-anno/bookmarks_multiple`, { deleted :  [ bookMarkIdToDelete ]}, headers);
        expect(bookMarkDeleteResponse.status).to.equal(200);
    });



    async function getNewBookmarkIdObject(bookmarkName, docId, pagenum, previd){
        const userId = await getUserId(userName, password);
        return {
            id: uuid(),
            name: bookmarkName,
            documentId: docId,
            createdBy: userId,
            pageNumber: pagenum,
            xCoordinate: -387,
            yCoordinate: -0.6666666666665151,
            parent: null,
            previous: previd
        }
    }

});
