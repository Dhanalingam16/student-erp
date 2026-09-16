import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { mockStudents } from '@school-erp/mock-data';

export default function ParentHomeScreen() {
  const child = mockStudents[0];
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>How is my child doing?</Text>

      <View style={styles.card}>
        <Text style={styles.name}>{child.name}</Text>
        <Text style={styles.sub}>{child.className} - {child.section} • Roll #{child.rollNo}</Text>

        <View style={styles.row}>
          <View style={styles.box}>
            <Text style={styles.label}>Attendance</Text>
            <Text style={styles.val}>{child.attendancePercentage}%</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Academic Score</Text>
            <Text style={styles.val}>{child.academicScore}%</Text>
          </View>
        </View>
      </View>

      <View style={[styles.card, styles.feeCard]}>
        <Text style={styles.feeTitle}>Term Fee Status</Text>
        <Text style={styles.feeText}>Pending Balance: ₹{child.feesPending.toLocaleString()}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  heading: { fontSize: 20, fontWeight: 'bold', color: '#0f172a', marginBottom: 16 },
  card: { padding: 16, backgroundColor: '#ffffff', borderRadius: 12, borderColor: '#e2e8f0', borderWidth: 1, marginBottom: 12 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' },
  sub: { fontSize: 12, color: '#64748b', marginBottom: 12 },
  row: { flexDirection: 'row', gap: 12 },
  box: { flex: 1, padding: 12, backgroundColor: '#f1f5f9', borderRadius: 8 },
  label: { fontSize: 11, color: '#64748b' },
  val: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginTop: 2 },
  feeCard: { backgroundColor: '#fffbeb', borderColor: '#fef3c7' },
  feeTitle: { fontSize: 13, fontWeight: 'bold', color: '#92400e' },
  feeText: { fontSize: 12, color: '#b45309', marginTop: 4 }
});
