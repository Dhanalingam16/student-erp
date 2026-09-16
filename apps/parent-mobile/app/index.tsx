import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ParentAppIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parent Family & Child Monitoring App</Text>
      <Text style={styles.subtitle}>SchoolOS Mobile Platform</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#ffffff' },
  subtitle: { fontSize: 12, color: '#94a3b8', marginTop: 4 }
});
