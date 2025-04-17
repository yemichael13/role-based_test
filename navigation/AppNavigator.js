// navigation/AppNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import TeacherHome from '../screens/home/TeacherHome';
import ParentHome from '../screens/home/ParentHome';
import StudentHome from '../screens/home/StudentHome';
import AdminHome from '../screens/home/AdminHome';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <>
            {role === 'teacher' && <Stack.Screen name="TeacherHome" component={TeacherHome} />}
            {role === 'parent' && <Stack.Screen name="ParentHome" component={ParentHome} />}
            {role === 'student' && <Stack.Screen name="StudentHome" component={StudentHome} />}
            {role === 'admin' && <Stack.Screen name="AdminHome" component={AdminHome} />}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;