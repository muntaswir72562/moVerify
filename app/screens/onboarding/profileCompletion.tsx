import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';

const questions = [
  "Some questions",
  "Some questions",
  "Some questions",
  "Some questions",
  "Some questions",
  "Some questions"
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
      <ScrollView style={{ flex: 1}}>
        <View style={styles.container}>
          <Text style={[styles.title, { color: colors.text }]}>Complete your profile</Text>
          {questions.map((question, index) => (
            <View key={index} style={styles.questionContainer}>
              <Text style={[styles.questionText, { color: colors.text }]}>{question}</Text>
              <TextInput
                style={[styles.input]}
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 15,
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#F5F5F5',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});