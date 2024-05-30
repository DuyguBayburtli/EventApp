import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const db = firebase.firestore();

export async function storeEvent(eventData) {
  try {
    const docRef = await db.collection('events').add(eventData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
}

export async function updateEvent(id, eventData) {
  try {
    await db.collection('events').doc(id).update(eventData);
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
}

export async function deleteEventHttp(id) {
  try {
    await db.collection('events').doc(id).delete();
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}

export async function joinEvent(userId, eventId) {
  const userRef = db.collection('users').doc(userId);
  const userDoc = await userRef.get();
  
  if (!userDoc.exists) {
    throw new Error('Kullanıcı bulunamadı!');
  }

  const userData = userDoc.data();
  const joinedEvents = userData.joinedEvents || [];

  if (joinedEvents.includes(eventId)) {
    throw new Error('Bu kursa zaten katıldınız.');
  }

  joinedEvents.push(eventId);

  await userRef.update({
    joinedEvents,
  });
}
