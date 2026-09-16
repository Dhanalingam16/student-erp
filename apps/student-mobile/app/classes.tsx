import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StudentClassesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enrolled Classes & Subjects</Text>
      <Text style={styles.text}>• Mathematics — Priya Sundaram (Room 204)</Text>
      <Text style={styles.text}>• Physics — Dr. Amit Gupta (Lab 2)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 12 },
  text: { fontSize: 13, color: '#334155', marginVertical: 6 }
});
