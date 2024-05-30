import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import ManageCourse from './screens/ManageCourse';
import RecentCourses from './screens/RecentCourses';
import AllCourses from './screens/AllCourses';
import LoginScreen from './screens/LoginScreen';
import CourseScreen from './screens/CourseScreen';

import ProfileScreen from './screens/ProfileScreen';
import SignUpScreen from './screens/SignupScreen';
import CoursesContextProvider from './store/coursesContext';
import { auth, checkIfAdmin } from './firebase';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CourseOverview() {
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const fetchAdminStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const adminStatus = await checkIfAdmin(user.uid);
        setIsAdmin(adminStatus);
      }
    };
    
    fetchAdminStatus();
  }, []);
  
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#1e1e1e', // Dark mode arka plan rengi
       
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowRadius: 20,
        shadowOffset: { height: 2, width: 0 },
        paddingBottom: 10,
        paddingTop: 10,
        height: 70,
        overflow: 'hidden',
      },
      tabBarActiveTintColor: '#dddddd', // Aktif renk olarak açık gri
      tabBarInactiveTintColor: '#666666', // Pasif renk olarak koyu gri
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
      },
      tabBarBackground: () => (
        <View style={{ backgroundColor: '#1e1e1e' }} /> // Dark mode uyumlu arka plan rengi
      ),
    }}
  >
    <Tab.Screen
      name="RecentCourses"
      component={RecentCourses}
      options={{headerShown: false ,
        title: 'Yakın Zamanda Kaydolunanlar',
        tabBarLabel: 'Yakın Zamanda',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="history" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="AllCourses"
      component={AllCourses}
      options={{headerShown: false ,
        title: 'Tüm Kurslar',
        tabBarLabel: 'Tüm Kurslar',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="menu-book" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: false ,
        title: 'Profil',
        tabBarLabel: 'Profil',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="person" size={24} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
  );
}

export default function App() {
  return (
    <CoursesContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignupScreen"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourseOverview"
            component={CourseOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageCourse"
            component={ManageCourse}
            //options={{ headerShown: false }}
          />
          <Stack.Screen name="CourseScreen" component={CourseScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CoursesContextProvider>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  iconContainer: {
    marginHorizontal: 8,
    marginVertical: 2,
  },
});
