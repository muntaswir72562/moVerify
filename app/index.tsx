import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>Welcome To</Text>
      <Text style={styles.appName}>MoVerify</Text>
      
      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        // onPress={() => router.push('./screens/login')}
        onPress={() => router.push('./screens/admin-dashboard/dashboard')}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      
      <Text style={styles.orText}>OR</Text>
      
      <TouchableOpacity
        style={[styles.button, styles.verifyButton]}
        onPress={() => router.push('./screens/onboarding/overallProcess')}
      >
        <Text style={styles.verifyButtonText}>Verify your identity</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    width: width * 0.8,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 24,
    color: '#333',
  },
  appName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#333',
    marginBottom: 40,
  },
  button: {
    width: width * 0.7,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  loginButtonText: {
    fontFamily: 'Poppins-Medium',
    color: '#333',
    fontSize: 16,
  },
  orText: {
    fontFamily: 'Poppins-Regular',
    color: '#666',
    fontSize: 16,
    marginVertical: 10,
  },
  verifyButton: {
    backgroundColor: '#000',
    marginTop: 10,
  },
  verifyButtonText: {
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    fontSize: 16,
  },
});