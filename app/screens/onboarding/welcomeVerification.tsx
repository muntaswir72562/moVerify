import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';

export default function WelcomeVerificationScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const handleGoToDashboard = () => {
    // Navigate to the dashboard screen
    // router.push('/dashboard');
  };

  return (
    <>
      <Stack.Screen options={{ title: '', headerShown: false }} />
      <View style={[styles.container]}>
        <Image
          source={require('../../../assets/images/verification-illustration.png')} // Make sure to add this image to your assets
          style={styles.illustration}
          resizeMode="contain"
        />
        <Text style={[styles.welcomeText, { color: colors.text }]}>Welcome, Muntaswir</Text>
        <Text style={[styles.verificationText, { color: colors.text }]}>
          Your identity has been verified!
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleGoToDashboard}>
          <Text style={styles.buttonText}>Go to dashboard</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#fff"
  },
  illustration: {
    width: '80%',
    height: 200,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  verificationText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});