import nock from 'nock';

const mockTopStoriesList = (list) => {
  return nock('https://hacker-news.firebaseio.com/')
    .get('/v0/topstories.json')
    .reply(200, JSON.stringify(list));
};

describe('NewsList.tsx', () => {
    beforeAll(async () => {
      await device.launchApp();
      mockTopStoriesList([]);
    });
  
    beforeEach(async () => {
      await device.reloadReactNative();
    });
  
    it('should have toggle stories button', async () => {
      await expect(element(by.id('toggle-stories-button'))).toBeVisible();
    });
  
    it('should show list of stories', async () => {
      await expect(element(by.id('list-stories'))).toBeVisible();
    });
});
  