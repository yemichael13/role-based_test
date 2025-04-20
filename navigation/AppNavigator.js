import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ParentHome from '../screens/parent/ParentHome';
import AdminPanel from '../screens/admin/AdminPanel';
import TeacherHome from '../screens/teacher/TeacherHome';
import AddChildScreen from '../screens/parent/AddChildScreen';
import ChildDashboard from '../screens/child/ChildDashboard';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, userRole } = useAuth();

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
        ) : (
          <>
            <Stack.Screen name="ParentHome" component={ParentHome} />
            <Stack.Screen name="AddChild" component={AddChildScreen} />
            <Stack.Screen name="ChildDashboard" component={ChildDashboard} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}