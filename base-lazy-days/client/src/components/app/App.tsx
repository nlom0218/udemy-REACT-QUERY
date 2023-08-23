import { ChakraProvider } from '@chakra-ui/react';
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactElement, Suspense } from 'react';

import { queryClient } from '../../react-query/queryClient';
import { theme } from '../../theme';
import { Loading } from './Loading';
import { Navbar } from './Navbar';
import { Routes } from './Routes';

export function App(): ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <QueryErrorResetBoundary>
          <Suspense fallback={<Loading />}>
            <Routes />
          </Suspense>
        </QueryErrorResetBoundary>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
