/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';

//Custom Components
import Navigation from '@src/navigation/root';
import StatusBarColored from '@src/components/status-bar';
import {COLORS} from '@src/utils/constants/colors';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBarColored backgroundColor={COLORS.primary} />

        <Navigation />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
