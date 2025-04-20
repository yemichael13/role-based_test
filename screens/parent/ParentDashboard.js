import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function ParentDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Button 1"
        onPress={() => {}}
      />
      <View style={styles.buttonSpacing} />
      <Button
        title="Button 2"
        onPress={() => {}}
      />
      <View style={styles.buttonSpacing} />
      <Button
        title="Button 3"
        onPress={() => {}}
      />
      <View style={styles.buttonSpacing} />
      <Button
        title="Button 4"
        onPress={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonSpacing: {
    marginVertical: 10,
  },
});
