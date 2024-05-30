import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function MyEvents() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Etkinliklerim</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Açık arka plan rengi
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333', // Koyu yazı rengi
    marginBottom: 20,
    marginTop: 20, // Başlığı biraz daha aşağı almak için
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
});
