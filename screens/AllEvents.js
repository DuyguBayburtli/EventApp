import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase'; // Firestore bağlantısını içe aktar
import EventItem from '../components/EventItem';
import { EventsContext } from '../store/EventsContext';

const AllEvents = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const eventsContext = useContext(EventsContext);

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const eventsRef = db.collection('events');
                const snapshot = await eventsRef.get();
                const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                eventsContext.setEvents(eventsData);
                setIsLoading(false);
            } catch (err) {
                setError('Kurslar yüklenirken bir hata oluştu!');
                setIsLoading(false);
            }
        };

        fetchEvents();
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

    const renderEventItem = ({ item }) => {
        return (
            <EventItem
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
                data={eventsContext.events}
                keyExtractor={item => item.id}
                renderItem={renderEventItem}
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

export default AllEvents;
