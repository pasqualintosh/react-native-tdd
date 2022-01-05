describe('App.tsx', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome-screen'))).toBeVisible();
  });

  it('should show welcome heading', async () => {
    await expect(element(by.id('heading'))).toBeVisible();
  });
});
