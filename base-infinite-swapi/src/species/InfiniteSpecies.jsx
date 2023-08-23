import InfiniteScroll from 'react-infinite-scroller';
import { Species } from './Species';

import { useInfiniteQuery } from '@tanstack/react-query';

const initialUrl = 'https://swapi.dev/api/species/';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query

  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['sw-species'],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
      {data.pages.map((pageData) =>
        pageData.results.map((item) => (
          <Species
            key={item.name}
            name={item.name}
            language={item.language}
            averageLifespan={item.average_lifespan}
          />
        ))
      )}
    </InfiniteScroll>
  );
}
