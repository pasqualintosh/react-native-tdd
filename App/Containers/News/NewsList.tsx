import {Box, Button, FlatList, HStack, Text, VStack} from 'native-base';
import React from 'react';
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
