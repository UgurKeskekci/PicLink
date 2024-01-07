
// MainPage.js
import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker'; // Import the library
import EventModal from './EventModal';
import EventDetailsPage from './EventDetailsPage';

const MainPage = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const createEvent = (event) => {
    setEvents([...events, event]);
  };

  const navigateToEventDetails = (eventName, eventDetails, eventPhotos) => {
    navigation.navigate('EventDetails', { eventName, eventDetails, eventPhotos });
  };

  const selectImage = (eventName) => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const newEvents = events.map((event) => {
          if (event.name === eventName) {
            return {
              ...event,
              photos: [...event.photos, response.uri], // Add the new photo to the existing array
            };
          }
          return event;
        });
        setEvents(newEvents);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text>Hello from MainPage!</Text>

      {/* "+" button to open the modal */}
      <Button title="+" onPress={toggleModal} />

      {/* List of events */}
      <FlatList
        data={events}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.eventItem}
            onPress={() => navigateToEventDetails(item.name, item.details, item.photos)}
          >
            <Text>{item.name}</Text>
            <Text>{item.details}</Text>
            <Button title="Select Photo" onPress={() => selectImage(item.name)} />
          </TouchableOpacity>
        )}
      />

      {/* Event creation modal */}
      <EventModal visible={isModalVisible} onClose={toggleModal} onCreateEvent={createEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    width: '80%',
    alignSelf: 'center',
  },
});

export default MainPage;
