import React from 'react';
import {cleanup, render, act, waitFor} from '@testing-library/react-native';

import NewsList from '../../Containers/News/NewsList';
import {NativeBaseProvider} from 'native-base';

jest.mock('./../../Utils/Api', () => {
  // const originalModule = jest.requireActual('./../../Utils/Api');
  return {
    __esModule: true,
    // ...originalModule,
    // default: jest.fn(() => ''),
    getNewsItems: jest.fn(() => {
      return [29874061, 29873106];
    }),
    getNewsItem: jest.fn(() => {
      return {id: 29874061, title: 'foo'};
    }),
  };
});

describe('NewList', () => {
  beforeEach(() => {});
  afterEach(() => cleanup());
  const inset = {
    frame: {x: 0, y: 0, width: 0, height: 0},
    insets: {top: 0, left: 0, right: 0, bottom: 0},
  };

  it('renders correctly', async () => {
    await act(async () => {
      const page = await waitFor(() =>
        render(
          <NativeBaseProvider initialWindowMetrics={inset}>
            <NewsList />
          </NativeBaseProvider>,
        ),
      );
      expect(page).toMatchSnapshot();
    });
  });

  it('loads news upon mount', async () => {
    await act(async () => {
      const root = await waitFor(() =>
        render(
          <NativeBaseProvider initialWindowMetrics={inset}>
            <NewsList />
          </NativeBaseProvider>,
        ),
      );

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          expect(root.queryAllByTestId('listStories')).not.toMatchObject([]);
          resolve();
        }, 3000);
      });
    });
  });
});
