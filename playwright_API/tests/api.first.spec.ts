import { expect, test } from "@playwright/test";
import { loadSessionCookies } from '../utils/sessionUtils';
import { faker } from '@faker-js/faker';
import { endpoints } from "../utils/routeTable";

const userIdentifier = 'SOLICITOR';
let xsrfToken: string | undefined;
let headers;
test.describe(`API tests for ${userIdentifier}`, () => {
    const { cookies } = loadSessionCookies(userIdentifier);
    xsrfToken = cookies.find((c: any) => c.name === 'XSRF-TOKEN')?.value;
    headers = {
        'X-XSRF-TOKEN': xsrfToken,
        'Content-Type': 'application/json',
        'X-Correlation-Id': faker.string.uuid()
    };

    test('GET caseshare/cases returns 200', async ({ request }) => {
        const response = await request.get('caseshare/cases', { ...headers });
        expect(response.ok()).toBeTruthy();
    });

    endpoints.forEach(({ endpoint }) => {
        test(`Check ${userIdentifier} receives 401 from ${endpoint}`, async ({ request }) => {
            const response = await request.get(endpoint, { ...headers });
           
            expect(response.status()).toBe(401);
            const body = await response.json();
            expect(await response.json()).toMatchObject({ message: 'Unauthorized' })
        });
    });
});