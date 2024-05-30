import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const EventScreen = ({ route }) => {
  const { event } = route.params;
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {event.image ? (
          <Image source={{ uri: event.image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Görsel Yok</Text>
          </View>
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{event.title}</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Konum:</Text>
            <Text style={styles.detailText}>{event.location}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Tarih:</Text>
            <Text style={styles.detailText}>{new Date(event.date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Saat:</Text>
            <Text style={styles.detailText}>{event.time}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Açıklama:</Text>
            <Text style={styles.detailText}>{event.description}</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Katıl</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff', // Açık tema uyumlu arka plan rengi
  },
  card: {
    backgroundColor: '#f0f0f0', // Açık tema uyumlu kart arka plan rengi
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    overflow: 'hidden',
    marginBottom: 20,
    marginTop: 100, // Kartı biraz aşağı itmek için marginTop eklendi
  },
  image: {
    width: '100%',
    height: 300,
  },
  imagePlaceholder: {
    width: '100%',
    height: 300,
    backgroundColor: '#e0e0e0', // Açık tema uyumlu görsel yok arka plan rengi
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#777', // Açık tema uyumlu görsel yok metin rengi
    fontSize: 18,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Açık tema uyumlu başlık metin rengi
    marginBottom: 20,
    textAlign: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555', // Açık tema uyumlu detay etiketi metin rengi
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#666', // Açık tema uyumlu detay metin rengi
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ff8c8c', // Açık tema uyumlu buton arka plan rengi
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});


export default EventScreen;
