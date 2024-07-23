import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';

const questions = [
  "What is your full legal name?",
  "What is your date of birth? (DD/MM/YYYY)",
  "What is your current residential address?",
  "What was the name of your first pet?",
  "In which city were you born?",
  "What was the make and model of your first car?",
  "What is your mother's maiden name?",
  "What was the name of your elementary/primary school?",
  "What is your occupation or job title?",
  "What is your preferred email address for communication?",
  "What is the highest level of education you have completed?",
  "In which country were you born?"
];

export default function profileCompletion() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const { colors } = useTheme();
  const router = useRouter();

  const handleAnswerChange = (text: string, index: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = text;
    setAnswers(newAnswers);
  };

  const handleSave = () => {
    console.log('Saving profile answers:', answers);
    // Implement your profile saving logic here
    router.push('./welcomeVerification');
  };

  return (
    <>
      <Stack.Screen options={{ title: '' }} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={[styles.title, { color: colors.text }]}>Complete your profile</Text>
          {questions.map((question, index) => (
            <View key={index} style={styles.questionContainer}>
              <Text style={[styles.questionText, { color: colors.text }]}>{question}</Text>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Your answer"
                placeholderTextColor={colors.text}
                value={answers[index]}
                onChangeText={(text) => handleAnswerChange(text, index)}
              />
            </View>
          ))}
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
    paddingBottom: 60,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 24,
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 54,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#F5F5F5',
  },
  button: {
    width: '100%',
    height: 54,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 27,
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
});