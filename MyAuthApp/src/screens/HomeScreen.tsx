import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const HomeScreen = () => {
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        profileImage: 'https://example.com/profile.jpg',
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
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
});

export default HomeScreen;