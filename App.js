import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import ManageEvent from './screens/ManageEvent';
import MyEvents from './screens/MyEvents';
import AllEvents from './screens/AllEvents';
import LoginScreen from './screens/LoginScreen';
import EventScreen from './screens/EventScreen';

import ProfileScreen from './screens/ProfileScreen';
import SignUpScreen from './screens/SignupScreen';
import EventsContextProvider from './store/EventsContext';
import { auth, checkIfAdmin } from './firebase';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function EventOverview() {
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
        backgroundColor: '#ffffff', // Açık arka plan rengi
        shadowColor: '#ccc',
        shadowOpacity: 0.8,
        shadowRadius: 20,
        shadowOffset: { height: 2, width: 0 },
        paddingBottom: 10,
        paddingTop: 10,
        height: 70,
        overflow: 'hidden',
      },
      tabBarActiveTintColor: '#111', // Aktif renk olarak mavi
      tabBarInactiveTintColor: '#8e8e93', // Pasif renk olarak açık gri
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
      },
      tabBarBackground: () => (
        <View style={{ backgroundColor: '#ffffff' }} /> // Açık arka plan rengi
      ),
    }}
    
  >
    <Tab.Screen
  name="MyEvents"
  component={MyEvents}
  options={{
    headerShown: false,
    title: 'Etkinliklerim',
    tabBarLabel: 'Etkinliklerim',
    tabBarIcon: ({ color }) => (
      <MaterialIcons name="event" size={24} color={color} />
    ),
  }}
/>
<Tab.Screen
  name="AllEvents"
  component={AllEvents}
  options={{
    headerShown: false,
    title: 'Tüm Etkinlikler',
    tabBarLabel: 'Tüm Etkinlikler',
    tabBarIcon: ({ color }) => (
      <MaterialIcons name="event-note" size={24} color={color} />
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
    <EventsContextProvider>
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
            name="EventOverview"
            component={EventOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageEvent"
            component={ManageEvent}
            //options={{ headerShown: false }}
          />
          <Stack.Screen name="EventScreen" component={EventScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </EventsContextProvider>
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
