// app/(tabs)/layout.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#6200ee',
        tabBarStyle: {
      backgroundColor: 'white', // This sets the background color of the tab bar
    },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          
    headerShown: false, // 👈 hides the top "Home" title
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-expense"
        options={{
          
    headerShown: false, // 👈 hides the top "Home" title
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="view-expenses"
        options={{
         
    headerShown: false, // 👈 hides the top "Home" title
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
