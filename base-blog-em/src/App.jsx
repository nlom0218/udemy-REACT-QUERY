import { Posts } from './Posts';
import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';

const queryClient = new QueryClient();

function App() {
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog Posts</h1>
        <Suspense fallback={<h3>Loading...</h3>}>
          <Posts />
        </Suspense>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
