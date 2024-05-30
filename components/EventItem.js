import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const EventItem = ({ id, title, location, date, time, description, image }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    const event = { id, title, location, date, time, description, image };
    navigation.navigate('EventScreen', { event });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.cardContainer} activeOpacity={0.5}>
      <View style={styles.card}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>No Image</Text>
          </View>
        )}
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.location}>{location}</Text>
          <Text style={styles.dateTime}>
            {new Date(date).toLocaleDateString()} - {time}
          </Text>
          
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e', // Dark mode arka plan rengi
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: '#555', // Dark mode arka plan rengi
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#aaa', // Daha açık bir gri tonu
  },
  details: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // Beyaz renk
    marginBottom: 5,
    fontFamily: 'sans-serif-medium',
  },
  location: {
    fontSize: 14,
    color: '#ccc', // Açık gri
    marginBottom: 5,
    fontFamily: 'sans-serif',
  },
  dateTime: {
    fontSize: 12,
    color: '#999', // Koyu gri
    marginBottom: 10,
    fontFamily: 'sans-serif',
  },
  description: {
    fontSize: 14,
    color: '#ddd', // Açık gri
    fontFamily: 'sans-serif',
  },
});

export default EventItem;
