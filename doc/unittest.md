- unistall (if exist) react-native-testing-library
- install @testing-library/react-native
- jest configuration in package.json

package.json

<code>
"jest": {
    "preset": "react-native",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    "modulePathIgnorePatterns": [
      "<rootDir>/e2e/"
    ]
  },
</code>

- PATTERN IN ORDER TO TEST COMPONENT DELCARED UNDER H.O.C. (NATIVEBASE)

NewsList.ts

<code>
import {getNewsItems} from '../../Utils/Api';
import NewsItem from './NewsItem';

export const getButtonTitle = (storiesType: 'TOP' | 'NEW') => {
if (storiesType === 'TOP') return 'Show new stories';
return 'Show top stories';
};

const NewsList: React.FC = (): JSX.Element => {
const [newsItems, setNewsItems] = React.useState<Array<string>>([]);
const [storiesType, setStoriesType] = React.useState<'TOP' | 'NEW'>('TOP');

const toggleStoriesType = () => {
setStoriesType(currentStoriesType =>
currentStoriesType === 'TOP' ? 'NEW' : 'TOP',
);
};

const intialize = async (): Promise<void> => {
const ids = await getNewsItems();
setNewsItems(ids.slice(0, 20));
};

React.useEffect(() => {
intialize();
}, []);

return (
<>
<Box safeArea>
<HStack justifyContent={'center'} alignItems={'center'}>
<Button
onPress={toggleStoriesType}
size={'full'}
testID="toggleStoriesButton">
<Text>{getButtonTitle(storiesType)}</Text>
</Button>
</HStack>
<VStack justifyContent={'center'} alignItems={'center'}>
{newsItems.length > 0 && (
<FlatList
data={newsItems}
renderItem={({item}) => <NewsItem id={item} />}
keyExtractor={id => id}
testID="listStories"
/>
)}
</VStack>
</Box>
</>
);
};

export default NewsList;
</code>

- NB la chiamata ogni modifica allo stato del componente va fatta all interno del componente, triggerata da un evento

Api.ts

<code>
export const getNewsItems = async (): Promise<Array<any>> => {
  const res = await fetch(
    'https://hacker-news.firebaseio.com/v0/topstories.json',
  );
  const ids: Array<any> = await res.json();
  return ids;
  //   console.log('got response', ids);
};

export const getNewsItem = async (id: string): Promise<any> => {
const res = await fetch(
`https://hacker-news.firebaseio.com/v0/item/${id}.json`,
);
const item: any = await res.json();
return item;
// console.log('item', item);

// setItem({...item});
};

</code>

NewsList-test.ts

<code>
import React from 'react';
import {cleanup, render, act, waitFor} from '@testing-library/react-native';

import NewsList from '../../Containers/News/NewsList';
import {NativeBaseProvider} from 'native-base';

jest.mock('./../../Utils/Api', () => {
// const originalModule = jest.requireActual('./../../Utils/Api');
return {
\_\_esModule: true,
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

</code>
