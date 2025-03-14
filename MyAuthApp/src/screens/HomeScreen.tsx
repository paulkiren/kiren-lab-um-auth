import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
    const navigation = useNavigation();
    const user = {
        name: 'Kiren Paul',
        email: 'Kiren.Paul@example.com',
        profileImage: 'https://example.com/profile.jpg',
    };

    const handleLogout = () => {
        AsyncStorage.removeItem('token');
        console.log('User logged out');
        navigation.navigate({name:'Login'});
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 18,
        color: 'gray',
    },
    // Add styles for the logout button if needed
});

export default HomeScreen;
