import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('EventOverview');
      }
    });
    return unsubscribe;
  }, [navigation]);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Kullanıcı giriş yaptı', user.email);
        navigation.navigate('EventOverview');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <ImageBackground source={require('../assets/.jpg')} style={styles.backgroundImage}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Merhaba!</Text>
          <Text style={styles.subHeaderText}>Hesabına giriş yap</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#a9a9a9"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#a9a9a9"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Şifreni mi unuttun?</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={styles.outlineButtonText}>Hesabın yok mu? Oluştur!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Arka planı hafif opak yapar
    width: '100%',
    padding: 20,
  },
  headerContainer: {
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 45, // Daha küçük ve modern boyut
    fontWeight: '400', // Daha ince font
    color: '#444', // Daha koyu ve modern renk
    textAlign: 'left', // Sola hizalanmış
    fontFamily: 'sans-serif', // Daha modern bir yazı tipi
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666', // Daha yumuşak bir gri ton
    marginBottom: 13,
    textAlign: 'left', // Sola hizalanmış
    fontFamily: 'sans-serif', // Daha modern bir yazı tipi
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff', // Beyaz arka plan
    paddingHorizontal: 20, // Daha fazla iç boşluk
    paddingVertical: 13,
    marginTop: 10, // Daha fazla üst boşluk
    borderRadius: 40, // Daha yuvarlak köşeler
    borderWidth: 1,
    borderColor: '#ddd', // Daha yumuşak bir gri ton
    fontSize: 16, // Daha büyük yazı boyutu
    shadowColor: '#000', // Gölgelendirme için
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8, // Android'de gölge için
  },
  forgotPasswordText: {
    fontWeight: '400', // Daha ince font
    color: '#444', // Daha koyu ve modern renk
    fontSize: 15,
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#666',
    padding: 15,
    alignItems: 'center',
    borderRadius: 30, // Daha yumuşak köşeler
    shadowColor: '#6666', // Gölgelendirme ekle
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: '400', // Daha ince font
    color: '#444', // Daha koyu ve modern renk
    marginBottom: 13,
    marginTop: 10,
    textAlign: 'left', // Sola hizalanmış
    width: '80%', // Metnin genişliği
    maxWidth: 300, // Metnin maksimum genişliği
    marginLeft: 20, // Metnin sol tarafında boşluk
    fontFamily: 'sans-serif',
  },
});
