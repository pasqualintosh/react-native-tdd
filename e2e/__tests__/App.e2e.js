describe('App.tsx', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show toggle theme', async () => {
    await expect(element(by.id('toggle-theme'))).toBeVisible();
  });
});
