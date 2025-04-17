// screens/home/TeacherHome.js
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import AuthContext from '../../context/AuthContext';

export default function TeacherHome() {
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Teacher Dashboard</Text>
      <Button title="Log Out" onPress={logout} />
    </View>
  );
}