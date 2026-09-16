import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { mockStudents, mockAssignments, mockExams } from '@school-erp/mock-data';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'classes' | 'tasks' | 'results' | 'profile'>('home');
  const student = mockStudents[0];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: student.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{student.name}</Text>
            <Text style={styles.userSub}>{student.className}-{student.section} • Roll #{student.rollNo}</Text>
          </View>
        </View>
      </View>

      {/* Main Screen Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'home' && (
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Daily Overview</Text>
              <View style={styles.row}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Attendance</Text>
                  <Text style={styles.statValue}>{student.attendancePercentage}%</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Academic Score</Text>
                  <Text style={styles.statValue}>{student.academicScore}%</Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Today's Classes</Text>
              <Text style={styles.itemText}>• 09:00 AM — Mathematics (Quadratic Proofs)</Text>
              <Text style={styles.itemText}>• 10:00 AM — Physics (Electromagnetic Induction)</Text>
              <Text style={styles.itemText}>• 11:30 AM — English Comprehension</Text>
            </View>

            <View style={[styles.card, styles.aiCard]}>
              <Text style={styles.aiTitle}>AI Study Recommendation</Text>
              <Text style={styles.aiText}>Review Physics Electromagnetic Induction lab notes before Friday's paper.</Text>
            </View>
          </View>
        )}

        {activeTab === 'classes' && (
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Subject Classes</Text>
              <Text style={styles.itemText}>• Mathematics — Faculty: Priya Sundaram</Text>
              <Text style={styles.itemText}>• Physics — Faculty: Dr. Amit Gupta</Text>
            </View>
          </View>
        )}

        {activeTab === 'tasks' && (
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Pending Assignments</Text>
              {mockAssignments.map(a => (
                <View key={a.id} style={styles.taskRow}>
                  <Text style={styles.taskTitle}>{a.title} ({a.subject})</Text>
                  <Text style={styles.taskDue}>Due: {a.dueDate}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'results' && (
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Term Report Card</Text>
              <Text style={styles.itemText}>Total Aggregate: 420/500 (84%)</Text>
              <Text style={styles.itemText}>Class Rank: #4</Text>
            </View>
          </View>
        )}

        {activeTab === 'profile' && (
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Student Digital ID</Text>
              <Text style={styles.itemText}>ID: {student.id}</Text>
              <Text style={styles.itemText}>Guardian: {student.parentName} ({student.parentPhone})</Text>
              <Text style={styles.itemText}>Blood Group: {student.bloodGroup}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Tabs */}
      <View style={styles.tabBar}>
        {(['home', 'classes', 'tasks', 'results', 'profile'] as const).map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabButton}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 16, backgroundColor: '#0f172a' },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  userName: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  userSub: { color: '#94a3b8', fontSize: 12 },
  content: { flex: 1, padding: 16 },
  cardContainer: { gap: 12 },
  card: { padding: 16, backgroundColor: '#ffffff', borderRadius: 12, borderHeight: 1, borderColor: '#e2e8f0' },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 },
  row: { flexDirection: 'row', gap: 12 },
  statBox: { flex: 1, padding: 12, backgroundColor: '#f1f5f9', borderRadius: 8 },
  statLabel: { fontSize: 11, color: '#64748b' },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginTop: 4 },
  itemText: { fontSize: 12, color: '#334155', marginVertical: 4 },
  aiCard: { backgroundColor: '#eff6ff', borderColor: '#bfdbfe' },
  aiTitle: { fontSize: 12, fontWeight: 'bold', color: '#1e40af' },
  aiText: { fontSize: 11, color: '#1e3a8a', marginTop: 4 },
  taskRow: { marginVertical: 6, paddingBottom: 6, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  taskTitle: { fontSize: 12, fontWeight: 'bold', color: '#0f172a' },
  taskDue: { fontSize: 10, color: '#64748b', marginTop: 2 },
  tabBar: { flexDirection: 'row', borderTopWidth: 1, borderColor: '#e2e8f0', backgroundColor: '#ffffff', paddingVertical: 12 },
  tabButton: { flex: 1, alignItems: 'center' },
  tabText: { fontSize: 10, fontWeight: 'bold', color: '#64748b' },
  activeTabText: { color: '#0f172a' }
});
