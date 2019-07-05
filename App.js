/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import LocationContainer from "./Components/LocationContainer";
import {dummyLocation} from "./utils/dummyData";



const App = () => {
  return (
      <LocationContainer
        location = {dummyLocation}
      />
  );
};

export default App;
