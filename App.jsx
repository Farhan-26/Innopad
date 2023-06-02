// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavigationStack from './src/navigation';

function App() {
  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
}

export default App;
