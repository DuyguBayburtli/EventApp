import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const db = firebase.firestore();

export async function storeCourse(courseData) {
  try {
    const docRef = await db.collection('courses').add(courseData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding course:', error);
    throw error;
  }
}

export async function updateCourse(id, courseData) {
  try {
    await db.collection('courses').doc(id).update(courseData);
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
}

export async function deleteCourseHttp(id) {
  try {
    await db.collection('courses').doc(id).delete();
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
}

export async function joinCourse(userId, courseId) {
  const userRef = db.collection('users').doc(userId);
  const userDoc = await userRef.get();
  
  if (!userDoc.exists) {
    throw new Error('Kullanıcı bulunamadı!');
  }

  const userData = userDoc.data();
  const joinedCourses = userData.joinedCourses || [];

  if (joinedCourses.includes(courseId)) {
    throw new Error('Bu kursa zaten katıldınız.');
  }

  joinedCourses.push(courseId);

  await userRef.update({
    joinedCourses,
  });
}
