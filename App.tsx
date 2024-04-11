import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import Navigation from './Components/Navigation';

// http://192.168.1.204:3000
// http://192.168.1.204:3000

const App = () => {
  useEffect(() => {
    // Change the status bar color when the component mounts
    StatusBar.setBackgroundColor('#ffffff'); // Use your desired color
    StatusBar.setBarStyle('dark-content'); // Set the text color of the status bar
    return () => {
      // Reset the status bar color when the component unmounts
      StatusBar.setBackgroundColor('#ffffff'); // Reset to your default color
      StatusBar.setBarStyle('dark-content'); // Reset the text color
    };
  }, []);
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
