import React, { useState, useContext } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AuthContext from '../../context/AuthContext';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const { register } = useContext(AuthContext);

  const handleSignUp = async () => {
    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }
    try {
      await register(email, password, role);
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 10, padding: 10 }}
      />
      
      <Picker
        selectedValue={role}
        onValueChange={(value) => setRole(value)}
        style={{ marginBottom: 20 }}>
        <Picker.Item label="Student" value="student" />
        <Picker.Item label="Parent" value="parent" />
        <Picker.Item label="Teacher" value="teacher" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>

      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}