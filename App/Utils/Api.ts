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
  //   console.log('item', item);

  //   setItem({...item});
};
