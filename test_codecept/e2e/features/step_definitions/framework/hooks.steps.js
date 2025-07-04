console.log('[Hook] ⚠️ Secondary hook running (not setting page):', __dirname);

Before(async () => {
  // global.scenarioData = {}
});

After(async () => {
  console.log('test completed');
});

Fail((test, err) => {
  // test didn't
  console.log('Failed with', err);
});
