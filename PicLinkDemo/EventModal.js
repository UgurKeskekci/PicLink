// EventModal.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

const EventModal = ({ visible, onClose, onCreateEvent }) => {
  const [eventName, setEventName] = useState('');
  const [eventDetails, setEventDetails] = useState('');

  const handleCreateEvent = () => {
    // Check if both event name and details are provided
    if (eventName.trim() !== '' && eventDetails.trim() !== '') {
      onCreateEvent({
        name: eventName,
        details: eventDetails,
      });
      onClose();
    } else {
      alert('Please provide both event name and details.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create Event</Text>

          <TextInput
            style={styles.input}
            placeholder="Event Name"
            onChangeText={(text) => setEventName(text)}
            value={eventName}
          />

          <TextInput
            style={styles.input}
            placeholder="Event Details"
            onChangeText={(text) => setEventDetails(text)}
            value={eventDetails}
            multiline
          />

          <Button title="Create Event" onPress={handleCreateEvent} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default EventModal;