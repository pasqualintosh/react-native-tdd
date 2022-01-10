import {Text} from 'native-base';
import React from 'react';
import {getNewsItem} from '../../Utils/Api';

interface IProps {
  id: string;
}

const NewsItem: React.FC<IProps> = ({id}): JSX.Element => {
  const [item, setItem] = React.useState<any | undefined>(undefined);

  const initialize = async (): Promise<void> => {
    const item = await getNewsItem(id);
    setItem({...item});
  };

  React.useEffect(() => {
    initialize();
  }, []);

  if (!item) return <></>;

  return item && <Text testID="newsTextItem">{item.title}</Text>;
};

export default NewsItem;
