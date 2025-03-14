import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';

const SettingsScreen: React.FC = () => {
    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account Settings</Text>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>Privacy Settings</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notifications</Text>
                <View style={styles.item}>
                    <Text style={styles.itemText}>Email Notifications</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemText}>Push Notifications</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>App Preferences</Text>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>Language</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>Theme</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    section: {
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
    },
});

export default SettingsScreen;
