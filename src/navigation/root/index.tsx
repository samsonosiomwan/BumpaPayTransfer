// Core packages
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Utils
import {ROUTES} from '@src/navigation/routes';

// Screens

import TransferHistory from '@src/screens/payments/TransferHistory';
import TransferFunds from '@src/screens/payments/TransferFunds';

const Stack = createNativeStackNavigator();

const NAVIGATION_OPTIONS = {
  headerShown: false,
};

function Roots() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.TRANSFER_FUNDS}
        component={TransferFunds}
        options={NAVIGATION_OPTIONS}
      />
      <Stack.Screen
        name={ROUTES.TRANSFER_HISTORY}
        component={TransferHistory}
        options={NAVIGATION_OPTIONS}
      />
    </Stack.Navigator>
  );
}

export default Roots;
