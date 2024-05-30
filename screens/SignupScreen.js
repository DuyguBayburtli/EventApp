import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { auth, db } from '../firebase';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        db.collection('users').doc(uid).set({
          uid: uid,
          name: name,
          email: email,
        });
        console.log('Kullanıcı kaydedildi:', email);
        navigation.navigate('Login');
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  };

  return (
    <ImageBackground source={require('../assets/gokkusagı.jpg')} style={styles.backgroundImage}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Merhaba!</Text>
          <Text style={styles.subHeaderText}>Hesabını oluştur</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="İsim"
            placeholderTextColor="#a9a9a9"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#a9a9a9"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            placeholderTextColor="#a9a9a9"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Şifreyi Onayla"
            placeholderTextColor="#a9a9a9"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Kaydol</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.outlineButtonText}>Zaten bir hesabın var mı? Giriş yap!</Text>
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
    width: '80%', // Metnin genişliği
    maxWidth: 300, // Metnin maksimum genişliği
    marginLeft: 0, // Metnin sol tarafında boşluk
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
    width: '90%',
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
  error: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#777',
    padding: 15,
    alignItems: 'center',
    borderRadius: 30, // Daha yumuşak köşeler
    shadowColor: '#7777', // Gölgelendirme ekle
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
