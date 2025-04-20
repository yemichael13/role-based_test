import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ParentHome from '../screens/parent/ParentHome';
import AdminPanel from '../screens/admin/AdminPanel';
import TeacherHome from '../screens/teacher/TeacherHome';
import ChildDashboard from '../screens/child/ChildDashboard';
import ParentDashboard from '../screens/parent/ParentDashboard';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, userRole, loading } = useAuth();

  // Log to check the state of user and userRole
  useEffect(() => {
    console.log("User: ", user);
    console.log("UserRole: ", userRole);
  }, [user, userRole]);

  // If still loading, prevent rendering the navigator
  if (loading) {
    return null;  // Optionally, you can return a loading screen here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : userRole === 'admin' ? (
          <Stack.Screen name="AdminPanel" component={AdminPanel} />
        ) : userRole === 'teacher' ? (
          <Stack.Screen name="TeacherHome" component={TeacherHome} />
        ) : userRole === 'parent' ? (  // Add an explicit check for the 'parent' role
          <>
            <Stack.Screen name="ParentHome" component={ParentHome} />
            <Stack.Screen name="ChildDashboard" component={ChildDashboard} />
            <Stack.Screen name="ParentDashboard" component={ParentDashboard} />
          </>
        ) : (
          // If none of the roles match
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
