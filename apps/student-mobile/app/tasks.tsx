import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { mockAssignments } from '@school-erp/mock-data';

export default function StudentTasksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Homework Tasks</Text>
      {mockAssignments.map(a => (
        <View key={a.id} style={styles.card}>
          <Text style={styles.taskTitle}>{a.title} ({a.subject})</Text>
          <Text style={styles.taskDue}>Due: {a.dueDate}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 12 },
  card: { padding: 12, backgroundColor: '#ffffff', borderRadius: 8, marginBottom: 8, borderColor: '#e2e8f0', borderWidth: 1 },
  taskTitle: { fontSize: 13, fontWeight: 'bold', color: '#0f172a' },
  taskDue: { fontSize: 11, color: '#64748b', marginTop: 2 }
});
