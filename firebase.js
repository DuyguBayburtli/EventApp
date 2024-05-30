import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAJfvf8uFwVkJf0qiBPx0ljsI7wpi2r-Xw",
  authDomain: "kurs-cf040.firebaseapp.com",
  projectId: "kurs-cf040",
  storageBucket: "kurs-cf040.appspot.com",
  messagingSenderId: "288634066736",
  appId: "1:288634066736:web:13375b61e8402f9b66daf5"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const setAdmin = async (userId, isAdmin) => {
  try {
    await db.collection('users').doc(userId).set({ admin: isAdmin }, { merge: true });
    console.log(`Kullanıcı ${userId} admin olarak ayarlandı: ${isAdmin}`);
  } catch (error) {
    console.error(`Kullanıcı ${userId} admin olarak ayarlanamadı:`, error);
  }
};

// Admin kullanıcıları burada belirtin
const adminUserIds = [
  "pq4fweS3SUNolxxjiY4b0sur9tw2"
]

// Admin kullanıcıları ayarlama
adminUserIds.forEach(userId => {
  setAdmin(userId, true);
});

// Kullanıcının admin olup olmadığını kontrol eden işlev
const checkIfAdmin = async (userId) => {
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      return userData.admin === true;
    } else {
      console.log('Kullanıcı belgesi bulunamadı');
      return false;
    }
  } catch (error) {
    console.error('Admin kontrolü sırasında hata oluştu:', error);
    return false;
  }
};

export { auth, db, setAdmin, checkIfAdmin, storage };
