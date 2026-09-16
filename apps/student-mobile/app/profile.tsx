import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { mockStudents } from '@school-erp/mock-data';

export default function StudentProfileScreen() {
  const student = mockStudents[0];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digital Student ID</Text>
      <View style={styles.card}>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.text}>ID: {student.id} • Roll #{student.rollNo}</Text>
        <Text style={styles.text}>Guardian: {student.parentName} ({student.parentPhone})</Text>
        <Text style={styles.text}>Blood Group: {student.bloodGroup}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 12 },
  card: { padding: 16, backgroundColor: '#ffffff', borderRadius: 12, borderColor: '#e2e8f0', borderWidth: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' },
  text: { fontSize: 12, color: '#475569', marginTop: 4 }
});
