import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import {useDispatch, useSelector} from 'react-redux';
import {loginSuccess} from '../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
export const navigationRef = React.createRef<NavigationContainerRef>();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        dispatch(loginSuccess({token: storedToken, user: {name: 'User'}}));
      }
    };
    checkAuth();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {token ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
