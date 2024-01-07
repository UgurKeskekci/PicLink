// EventDetailsPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EventDetailsPage = ({ route }) => {
  const { eventName, eventDetails, eventPhotos } = route.params;
  const [photos, setPhotos] = useState(eventPhotos);


  choosePhotosFromGallery = () => {
    ImagePicker.openPicker({
        width: 300,
        height: 200,
        multiple: true,
    })
        .then(images => {
            console.log(images)
            if (images.length > 0) {
                this.navigateToViewPhotos(images);
            }
        })
        .catch(err => {
            console.log(' Error fetching images from gallery ', err);
        });
};

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Result:', result);

      if (result && result.assets && result.assets.length > 0 && result.assets[0].uri) {
        console.log('Selected Assets:', result.assets);
        setPhotos(prevPhotos => [...prevPhotos, result.assets[0].uri]);
      } else if (result && !result.canceled) {
        console.warn('Image picker result is missing the "assets" array or "uri" property.');
      } else {
        console.log('Image picker was canceled');
      }
    } catch (error) {
      console.error('Error while picking an image', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>{eventName}</Text>
      <Text style={styles.eventDetails}>{eventDetails}</Text>

      <View style={styles.separator} />

      {/* Grid layout for photos */}
      <FlatList
        data={photos}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          item ? <Image source={{ uri: item }} style={styles.photo} /> : null
        )}
      />

      {/* Add Photo button */}
      <Button title="Add Photo" onPress={selectImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  eventDetails: {
    marginTop: 10,
  },
  separator: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  photo: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default EventDetailsPage;
