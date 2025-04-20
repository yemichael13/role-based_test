// screens/auth/LoginScreen.js
import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  StyleSheet, 
  SafeAreaView, 
  ActivityIndicator, 
  Alert,
  Text
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      // → on success you'll just proceed (e.g. via your onAuthStateChanged listener)
    } catch (error) {
      // ← LOG raw error so you can inspect error.code and error.message
      console.log('[LoginScreen] login error:', error, 'code:', error.code, 'message:', error.message);

      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>EthioKids Learn</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#1E90FF" />
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <Button
                title="Login"
                onPress={handleLogin}
                color="#1E90FF"
              />
            </View>
            
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>
                Don't have an account?{' '}
                <Text 
                  style={styles.link}
                  onPress={() => navigation.navigate('SignUp')}
                >
                  Sign up
                </Text>
              </Text>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E90FF',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  linkContainer: {
    marginTop: 25,
    alignItems: 'center',
  },
  linkText: {
    color: '#666666',
    fontSize: 16,
  },
  link: {
    color: '#1E90FF',
    fontWeight: '600',
  },
});
