import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

const ProfileScreen: React.FC = () => {
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);

  const renderPost = ({ item }) => (
    <Image source={{ uri: item.image }} style={styles.postImage} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={styles.postsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  bio: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 4,
  },
  postsContainer: {
    marginTop: 16,
  },
  postImage: {
    width: '33%',
    aspectRatio: 1,
  },
});

export default ProfileScreen;

