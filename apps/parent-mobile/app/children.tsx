import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { mockStudents } from '@school-erp/mock-data';

export default function ParentChildrenScreen() {
  const children = [mockStudents[0], mockStudents[1]];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Children Enrolled</Text>
      {children.map(c => (
        <View key={c.id} style={styles.card}>
          <Text style={styles.name}>{c.name}</Text>
          <Text style={styles.text}>{c.className} - {c.section} • Attendance: {c.attendancePercentage}%</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 12 },
  card: { padding: 14, backgroundColor: '#ffffff', borderRadius: 10, borderColor: '#e2e8f0', borderWidth: 1, marginBottom: 8 },
  name: { fontSize: 14, fontWeight: 'bold', color: '#0f172a' },
  text: { fontSize: 12, color: '#64748b', marginTop: 2 }
});
