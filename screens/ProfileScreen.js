import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection('users').doc(user.uid).get()
          .then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              setUser(userData);
              setIsAdmin(userData.isAdmin);
            }
          })
          .catch((error) => console.error('Kullanıcı verisi alınırken hata oluştu:', error));
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.emailText}>{user.email}</Text>
        </>
      ) : (
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      )}
      <View style={styles.menuItem}>
        <TouchableOpacity style={styles.menuItemButton}>
          <Text style={styles.menuItemText}>Profili Düzenle</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity style={styles.menuItemButton}>
          <Text style={styles.menuItemText}>Ayarlar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity onPress={() => navigation.navigate('ManageEvent')} style={styles.menuItemButton}>
          <Text style={styles.menuItemText}>Etkinlik Ekle</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity onPress={handleSignOut} style={[styles.menuItemButton, styles.logoutButton]}>
          <Text style={styles.menuItemText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Açık arka plan rengi
    padding: 20,
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333', // Koyu gri
    marginBottom: 10,
  },
  emailText: {
    fontSize: 18,
    color: '#666', // Gri tonu
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#666', // Gri tonu
  },
  menuItem: {
    width: '100%',
    marginBottom: 10,
  },
  menuItemButton: {
    backgroundColor: '#eee', // Açık gri arka plan rengi
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 18,
    color: '#333', // Koyu gri
  },
  logoutButton: {
    backgroundColor: '#fbb', // Kırmızı
  },
});

export default ProfileScreen;
