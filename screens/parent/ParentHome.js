// screens/parent/ParentHome.js
import React, { useState } from 'react';
import { View, Button, FlatList, Text } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

export default function ParentHome({ navigation }) {
  const { user, logout } = useAuth();
  const [children, setChildren] = useState([]);

  const addChild = async (childName) => {
    try {
      const docRef = await addDoc(collection(db, 'children'), {
        parentId: user.uid,
        name: childName,
        progress: { math: 0, literacy: 0 }
      });
      setChildren([...children, { id: docRef.id, name: childName }]);
    } catch (error) {
      console.error('Error adding child: ', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button
        title="Add Child"
        onPress={() => navigation.navigate('AddChild')}
      />
      
      <FlatList
        data={children}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.childItem}>
            <Text>{item.name}</Text>
            <Button
              title="View Progress"
              onPress={() => navigation.navigate('ChildDashboard', { childId: item.id })}
            />
          </View>
        )}
      />

      <Button title="Log Out" onPress={logout} />
    </View>
  );
}

const styles = {
  childItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
};