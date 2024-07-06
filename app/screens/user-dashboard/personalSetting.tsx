import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';
import Sidebar from '../../../components/sidebar';

const PersonalSettings: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const translateX = useSharedValue<number>(-300);

  const [personalInfo, setPersonalInfo] = useState({
    title: '',
    firstName: '',
    lastName: '',
    martialStatus: '',
    countryOfBirth: '',
    phoneNumber: '',
  });

  const sidebarStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const animationConfig: WithTimingConfig = {
    duration: 300,
  };

  const openSidebar = () => {
    setSidebarOpen(true);
    translateX.value = withTiming(0, animationConfig);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    translateX.value = withTiming(-300, animationConfig);
  };

  const handleInputChange = (field: string, value: string) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log('Saving personal info:', personalInfo);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.sidebar, sidebarStyle]}>
        <Sidebar onClose={closeSidebar} />
      </Animated.View>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={openSidebar}>
            <Ionicons name="menu-outline" size={30} color="#2C3E50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Personal Settings</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.formContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={personalInfo.title}
            onChangeText={(text) => handleInputChange('title', text)}
          />

          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={personalInfo.firstName}
            onChangeText={(text) => handleInputChange('firstName', text)}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={personalInfo.lastName}
            onChangeText={(text) => handleInputChange('lastName', text)}
          />

          <Text style={styles.label}>Martial status</Text>
          <TextInput
            style={styles.input}
            value={personalInfo.martialStatus}
            onChangeText={(text) => handleInputChange('martialStatus', text)}
          />

          <Text style={styles.label}>Country of birth</Text>
          <TextInput
            style={styles.input}
            value={personalInfo.countryOfBirth}
            onChangeText={(text) => handleInputChange('countryOfBirth', text)}
          />

          <Text style={styles.label}>Phone number</Text>
          <TextInput
            style={styles.input}
            value={personalInfo.phoneNumber}
            onChangeText={(text) => handleInputChange('phoneNumber', text)}
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#F5F5F5',
    zIndex: 100,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    fontFamily: 'Poppins-Bold',
  },
  placeholder: {
    width: 30,
  },
  formContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  saveButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
});

export default PersonalSettings;