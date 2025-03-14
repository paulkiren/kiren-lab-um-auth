import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../store/authSlice';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginRequest({ username, password }));
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput placeholder="Username" onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: { width: 200, borderWidth: 1, marginBottom: 10, padding: 5 },
});

export default LoginScreen;
