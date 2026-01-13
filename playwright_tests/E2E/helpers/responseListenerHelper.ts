export async function waitForSpecificResponse(page, urlSubstring, method = 'GET', timeout = 40000) {
  try {
    const response = await page.waitForResponse((response) => {
      const request = response.request();
      return request.url().includes(urlSubstring) && request.method() === method;
    }, { timeout });
    return response.json();
  } catch (error) {
    console.error(`Error waiting for response with URL containing "${urlSubstring}" and method "${method}":`, error);
    throw error;
  }
}
