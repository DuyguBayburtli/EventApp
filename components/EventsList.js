import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import CourseItem from './CourseItem';


function RenderCourseItem(itemData) {
  return <CourseItem {...itemData.item} />;
}

export default function CoursesList({ courses }) {
  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id}
      renderItem={RenderCourseItem}
    />
  );
}

const styles = StyleSheet.create({});
