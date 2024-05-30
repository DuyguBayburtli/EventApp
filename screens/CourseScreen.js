import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const CourseScreen = ({ route }) => {
  const { course } = route.params;
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {course.image ? (
          <Image source={{ uri: course.image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Görsel Yok</Text>
          </View>
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{course.title}</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Konum:</Text>
            <Text style={styles.detailText}>{course.location}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Tarih:</Text>
            <Text style={styles.detailText}>{new Date(course.date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Saat:</Text>
            <Text style={styles.detailText}>{course.time}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Açıklama:</Text>
            <Text style={styles.detailText}>{course.description}</Text>
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
    backgroundColor: '#1e1e1e', // Dark mode uyumlu arka plan rengi
  },
  card: {
    backgroundColor: '#292929', // Dark mode uyumlu kart arka plan rengi
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  imagePlaceholder: {
    width: '100%',
    height: 300,
    backgroundColor: '#3a3a3a', // Dark mode uyumlu görsel yok arka plan rengi
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#6c757d', // Dark mode uyumlu görsel yok metin rengi
    fontSize: 18,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Dark mode uyumlu başlık metin rengi
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
    color: '#bbb', // Dark mode uyumlu detay etiketi metin rengi
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#ddd', // Dark mode uyumlu detay metin rengi
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ff6f61',
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

export default CourseScreen;
