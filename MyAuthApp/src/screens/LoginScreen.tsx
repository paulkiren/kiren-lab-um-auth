import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequest} from '../store/authSlice';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const authError = useSelector(state => state.auth.error);

  const handleLogin = () => {
    dispatch(loginRequest({username, password}));
  };

  useEffect(() => {
    if (authError) {
      setErrorMessage(authError);
    }
  }, [authError]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.forgotPassword}>Forgot Password?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {width: 220, height: 220, marginBottom: 20},
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fafafa',
  },
  forgotPassword: {color: '#3897f0', marginTop: 15},
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
