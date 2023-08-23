/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useEffect, useState } from 'react';

import { PostDetail } from './PostDetail';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const maxPostPage = 10;

async function fetchPosts(currentPage) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`
  );

  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage >= maxPostPage) return;

    const nextPage = currentPage + 1;
    queryClient.prefetchQuery({
      queryKey: ['posts', nextPage],
      queryFn: () => fetchPosts(currentPage),
    });
  }, [currentPage]);

  // replace with useQuery
  const { data, isError, error } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => fetchPosts(currentPage),
    suspense: true,
  });

  // error를 보여주기 전 react-query는 기본적으로 4번의 fetching를 하여 해당 데이터를 가져올 수 없다고 결정한다.
  if (isError)
    return (
      <>
        <h3>Error...</h3>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && (
        <Suspense fallback={<h3>Loading...</h3>}>
          <PostDetail post={selectedPost} />
        </Suspense>
      )}
    </>
  );
}
