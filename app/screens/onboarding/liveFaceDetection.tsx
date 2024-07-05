import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { useRouter } from 'expo-router';

const LiveFaceDetection = () => {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={[styles.title, { color: colors.text }]}>
          Live face detection
        </Text>
        <Text style={[styles.description, { color: colors.text }]}>
          We will use your selfie to ensure that you are the claimed person and
          will compare it to our identity
        </Text>

        <View style={styles.instructionContainer}>
          <View style={styles.instructionItem}>
            <Text style={[styles.instructionNumber, { color: colors.text }]}>
              1
            </Text>
            <View>
              <Text style={[styles.instructionTitle, { color: colors.text }]}>
                Good lighting
              </Text>
              <Text style={[styles.instructionText, { color: colors.text }]}>
                • Your face must not be obscured by light glare or reflections
              </Text>
            </View>
          </View>

          <View style={styles.instructionItem}>
            <Text style={[styles.instructionNumber, { color: colors.text }]}>
              2
            </Text>
            <View>
              <Text style={[styles.instructionTitle, { color: colors.text }]}>
                Face visible
              </Text>
              <Text style={[styles.instructionText, { color: colors.text }]}>
                • Ensure your face is fully visible, with both eyes, nose and
                the mouth clearly seen
              </Text>
              <Text style={[styles.instructionText, { color: colors.text }]}>
                • Maintain a neutral facial expression during capture
              </Text>
            </View>
          </View>
        </View>

        <Text style={[styles.exampleText, { color: colors.text }]}>
          Example:
        </Text>
        <View style={styles.videoPlaceholder}>
          {/* <Image 
            source={require('../assets/play-button.png')}
            style={styles.playButton}
          /> */}
        </View>
        <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('./phoneNumber')}
        >
          <Text style={styles.buttonText}>Open camera</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    marginBottom: 10,
  },
  description: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginBottom: 20,
  },
  instructionContainer: {
    marginBottom: 20,
  },
  instructionItem: {
    flexDirection: "row",
    marginBottom: 15,
  },
  instructionNumber: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    marginRight: 10,
  },
  instructionTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    marginBottom: 5,
  },
  instructionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  exampleText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    marginBottom: 10,
  },
  videoPlaceholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  playButton: {
    width: 50,
    height: 50,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Medium",
    color: "#fff",
    fontSize: 16,
  },
});

export default LiveFaceDetection;
