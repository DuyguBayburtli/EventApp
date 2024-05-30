import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useContext, useLayoutEffect } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { EventsContext } from '../store/EventsContext';
import EventForm from '../components/EventForm';
import { storeEvent, updateEvent, deleteEventHttp } from '../helper/http';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorText from '../components/ErrorText';

export default function ManageEvent({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const eventsContext = useContext(EventsContext);
  const eventId = route.params?.eventId;
  let isEditing = false;

  const selectedEvent = eventsContext.events.find(
    (event) => event.id === eventId
  );

  if (eventId) {
    isEditing = true;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Kursu Güncelle' : 'Kurs Ekle',
      headerStyle: { backgroundColor: '#333' }, // Koyu gri arka plan rengi
      headerTintColor: '#ffffff',
    });
  }, [navigation, isEditing]);

  async function deleteEvent() {
    setIsSubmitting(true);
    setError(null);
    try {
      eventsContext.deleteEvent(eventId);
      await deleteEventHttp(eventId);
      navigation.goBack();
    } catch (error) {
      setError('Kursları silemedik!');
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorText message={error} />;
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function addOrUpdateHandler(eventData) {
    setIsSubmitting(true);
    setError(null);
    try {
      if (isEditing) {
        eventsContext.updateEvent(eventId, eventData);
        await updateEvent(eventId, eventData);
      } else {
        const id = await storeEvent(eventData);
        eventsContext.addEvent({ ...eventData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError('Kurs eklemede veya güncellemede problem var!');
      setIsSubmitting(false);
    }
  }

  if (isSubmitting) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <EventForm
        buttonLabel={isEditing ? 'Güncelle' : 'Ekle'}
        onSubmit={addOrUpdateHandler}
        cancelHandler={cancelHandler}
        defaultValues={selectedEvent}
      />

      {isEditing && (
        <Pressable style={styles.deleteContainer} onPress={deleteEvent}>
          <EvilIcons
            name="trash"
            size={36}
            color="red"
          />
          <Text style={styles.deleteText}>Sil</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:0,
    backgroundColor: '#333', // Koyu gri arka plan rengi
  },
  deleteContainer: {
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#555', // Biraz daha açık gri bir çizgi
    paddingTop: 10,
    marginTop: 16,
    flexDirection: 'row',
  },
  deleteText: {
    fontSize: 18,
    color: 'red',
    marginLeft: 8,
  },
});
