import { useMutation, useQuery } from '@tanstack/react-query';

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'DELETE' }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'PATCH', data: { title: 'REACT QUERY FOREVER!!!!' } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isError, error } = useQuery({
    queryKey: ['comments', post.id],
    queryFn: () => fetchComments(post.id),
    suspense: true,
    cacheTime: 10000,
  });

  const deleteMutation = useMutation((postId) => deletePost(postId));

  const updateTitleMutation = useMutation({
    mutationFn: (postId) => updatePost(postId),
    onSuccess: (data, variables, context) => {
      console.log(data, variables, context);
    },
    onError: (data, variables, context) => {
      console.log(data, variables, context);
    },
  });

  if (isError)
    return (
      <>
        <h3>Error...</h3>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && (
        <p style={{ color: 'red' }}>Error deleting the post</p>
      )}
      {deleteMutation.isLoading && (
        <p style={{ color: 'purple' }}>Deleting the post</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: 'green' }}>Post has been delete</p>
      )}
      <button onClick={() => updateTitleMutation.mutate(post.id)}>
        Update title
      </button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
