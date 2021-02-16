import React from 'react';
import Layout from './shared/Layout';
import { Flex } from './styles';
import { GlobalStyles } from './styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { InsightProvider } from './providers/insightProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InsightProvider>
        <Flex className='App'>
          <GlobalStyles />
          <Layout />
        </Flex>
      </InsightProvider>
    </QueryClientProvider>
  );
}

export default App;
