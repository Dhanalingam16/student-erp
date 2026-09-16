import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StudentResultsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Term 1 Report Card</Text>
      <View style={styles.card}>
        <Text style={styles.score}>Total Score: 420/500 (84%)</Text>
        <Text style={styles.text}>Class Rank: #4</Text>
        <Text style={styles.text}>Grade: A</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 12 },
  card: { padding: 16, backgroundColor: '#0f172a', borderRadius: 12 },
  score: { fontSize: 20, fontWeight: 'bold', color: '#ffffff' },
  text: { fontSize: 13, color: '#cbd5e1', marginTop: 4 }
});
