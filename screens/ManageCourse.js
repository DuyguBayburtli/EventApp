import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useContext, useLayoutEffect } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { CoursesContext } from '../store/coursesContext';
import CourseForm from '../components/CourseForm';
import { storeCourse, updateCourse, deleteCourseHttp } from '../helper/http';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorText from '../components/ErrorText';

export default function ManageCourse({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const coursesContext = useContext(CoursesContext);
  const courseId = route.params?.courseId;
  let isEditing = false;

  const selectedCourse = coursesContext.courses.find(
    (course) => course.id === courseId
  );

  if (courseId) {
    isEditing = true;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Kursu Güncelle' : 'Kurs Ekle',
      headerStyle: { backgroundColor: '#333' }, // Koyu gri arka plan rengi
      headerTintColor: '#ffffff',
    });
  }, [navigation, isEditing]);

  async function deleteCourse() {
    setIsSubmitting(true);
    setError(null);
    try {
      coursesContext.deleteCourse(courseId);
      await deleteCourseHttp(courseId);
      navigation.goBack();
    } catch (error) {
      setError('Kursları silemedik!');
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorText message={error} />;
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function addOrUpdateHandler(courseData) {
    setIsSubmitting(true);
    setError(null);
    try {
      if (isEditing) {
        coursesContext.updateCourse(courseId, courseData);
        await updateCourse(courseId, courseData);
      } else {
        const id = await storeCourse(courseData);
        coursesContext.addCourse({ ...courseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError('Kurs eklemede veya güncellemede problem var!');
      setIsSubmitting(false);
    }
  }

  if (isSubmitting) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <CourseForm
        buttonLabel={isEditing ? 'Güncelle' : 'Ekle'}
        onSubmit={addOrUpdateHandler}
        cancelHandler={cancelHandler}
        defaultValues={selectedCourse}
      />

      {isEditing && (
        <Pressable style={styles.deleteContainer} onPress={deleteCourse}>
          <EvilIcons
            name="trash"
            size={36}
            color="red"
          />
          <Text style={styles.deleteText}>Sil</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:0,
    backgroundColor: '#333', // Koyu gri arka plan rengi
  },
  deleteContainer: {
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#555', // Biraz daha açık gri bir çizgi
    paddingTop: 10,
    marginTop: 16,
    flexDirection: 'row',
  },
  deleteText: {
    fontSize: 18,
    color: 'red',
    marginLeft: 8,
  },
});
