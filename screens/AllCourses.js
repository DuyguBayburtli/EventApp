import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase'; // Firestore bağlantısını içe aktar
import CourseItem from '../components/CourseItem';
import { CoursesContext } from '../store/coursesContext';

const AllCourses = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const coursesContext = useContext(CoursesContext);

    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const coursesRef = db.collection('courses');
                const snapshot = await coursesRef.get();
                const coursesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                coursesContext.setCourses(coursesData);
                setIsLoading(false);
            } catch (err) {
                setError('Kurslar yüklenirken bir hata oluştu!');
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <Text style={styles.loadingText}>Yükleniyor...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    const renderCourseItem = ({ item }) => {
        return (
            <CourseItem
                id={item.id}
                title={item.title}
                location={item.location}
                date={new Date(item.date.seconds * 1000)} // Firestore timestamp'ini Date objesine çevir
                time={item.time}
                description={item.description}
                image={item.image}
            />
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tüm Kurslar</Text>
            <FlatList
                data={coursesContext.courses}
                keyExtractor={item => item.id}
                renderItem={renderCourseItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark mode arka plan rengi
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
        marginTop: 20, // Başlığı biraz daha aşağı almak için
        textAlign: 'center',
        fontFamily: 'sans-serif',
    },
    list: {
        paddingBottom: 50,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: '#ffffff',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
});

export default AllCourses;
