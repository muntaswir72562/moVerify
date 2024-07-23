import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const OverallProcess = () => {
  const router = useRouter();
  const steps: { icon: keyof typeof Ionicons.glyphMap; title: string }[] = [
    { icon: 'document-text-outline', title: 'Upload identity documents' },
    { icon: 'camera-outline', title: 'Liveness check' },
    { icon: 'finger-print-outline', title: 'Biometric verification*' },
    { icon: 'person-outline', title: 'Complete profile' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's start</Text>
      <Text style={styles.subtitle}>Please submit the documents below to process your application</Text>
      
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name={step.icon} size={24} color="#007AFF" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.stepNumber}>Step {index + 1}</Text>
            <Text style={styles.stepTitle}>{step.title}</Text>
          </View>
        </View>
      ))}
      
      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoButtonText}>Why this is needed?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.startButton}
        onPress={() => router.push('./uploadDocument')}
      >
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  stepNumber: {
    fontSize: 12,
    color: '#2C3E50',
    fontFamily: 'Poppins-Medium',
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#2C3E50',
  },
  infoButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  infoButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#4A90E2',
  },
  startButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
});

export default OverallProcess;