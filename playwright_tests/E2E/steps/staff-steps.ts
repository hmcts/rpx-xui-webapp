  export async function clickToStaffPage(page) {
    console.log("Going to Staff Page");
    const numberOfTrials = 5;
    for (let i = 0; i < numberOfTrials; i++) {
      try {
        await page.getByRole('link', { name: 'Staff' }).click();
        await page.waitForSelector('text=User list', { state: 'visible', timeout: 1000 });
        break;
      } catch (error) {
        console.log(`Click to staff page failed, retrying (${i + 1}/${numberOfTrials})...`);
        if (i !== numberOfTrials) await page.waitForTimeout(1000); // Wait 1 second before the next attempt
        else throw error;
      }
    }
  }