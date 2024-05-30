import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import EventsList from './EventsList';

export default function Events({ eventsPeriod, events, nullText }) {
  let content = <Text style={styles.alert}>{nullText}</Text>;

  if (events.length > 0) {
    content = <eventsList events={events} />;
  }
  return (
    <View style={styles.container}>
      
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  alert: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
  },
});
