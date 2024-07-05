import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const UploadDocument: React.FC = () => {
  const router = useRouter();

  const renderOption = (icon: string, title: string) => (
    <TouchableOpacity style={styles.optionContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={24} color="#4A90E2" />
      </View>
      <Text style={styles.optionText}>{title}</Text>
      <Ionicons name="chevron-forward" size={24} color="#C7C7CC" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.idCardIcon}>
              <Ionicons name="person-outline" size={40} color="#4A90E2" />
            </View>
            <Text style={styles.title}>Upload proof of your identity</Text>
            <Text style={styles.subtitle}>Please submit the documents below</Text>
          </View>
          
          {renderOption("card-outline", "National identity card")}
          {renderOption("document-text-outline", "Utility bill")}
          {renderOption("book-outline", "Passport*")}
          
          <Text style={styles.note}>*If you don't have a national identity card, please upload your passport</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => router.push('./liveFaceDetection')}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpButtonText}>Need Help?</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  idCardIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F0FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F0FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#333',
  },
  note: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
    marginTop: 10,
    fontStyle: 'italic',
  },
  buttonContainer: {
    padding: 20,
  },
  continueButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  helpButton: {
    padding: 15,
    alignItems: 'center',
  },
  helpButtonText: {
    fontFamily: 'Poppins-Medium',
    color: '#4A90E2',
    fontSize: 16,
  },
});

export default UploadDocument;