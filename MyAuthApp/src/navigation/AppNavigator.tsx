import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import {loginSuccess} from '../store/authSlice';

const Stack = createStackNavigator();
export const navigationRef = React.createRef<NavigationContainerRef>();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.auth);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        dispatch(loginSuccess({token: storedToken, user: {name: 'User'}}));
      }
      setIsReady(true);
    };
    checkAuth();
  }, [dispatch]);

  if (!isReady) {
    return null; // or a loading spinner
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
