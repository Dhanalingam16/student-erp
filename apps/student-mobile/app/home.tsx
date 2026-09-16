import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { mockStudents } from '@school-erp/mock-data';

export default function StudentHomeScreen() {
  const student = mockStudents[0];
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Good morning, {student.name.split(' ')[0]}</Text>
      <Text style={styles.sub}>Grade {student.className} • Section {student.section}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Classes</Text>
        <Text style={styles.text}>• 09:00 AM — Mathematics</Text>
        <Text style={styles.text}>• 10:30 AM — Physics</Text>
        <Text style={styles.text}>• 12:00 PM — English Literature</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Attendance Gauge</Text>
        <Text style={styles.stat}>{student.attendancePercentage}%</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#0f172a' },
  sub: { fontSize: 12, color: '#64748b', marginBottom: 16 },
  card: { padding: 16, backgroundColor: '#ffffff', borderRadius: 12, borderHeight: 1, borderColor: '#e2e8f0', marginBottom: 12 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 },
  text: { fontSize: 12, color: '#334155', marginVertical: 4 },
  stat: { fontSize: 24, fontWeight: 'bold', color: '#166534' }
});
