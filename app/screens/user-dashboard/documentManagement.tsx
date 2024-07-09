import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  WithTimingConfig 
} from 'react-native-reanimated';

import Sidebar from '../../../components/sidebar';

const DocumentManagement: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const translateX = useSharedValue<number>(-300);

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

  const documents = [
    { name: 'NIC', status: 'Verified', expiryDate: 'N/A', action: 'N/A' },
    { name: 'Passport', status: 'Verified', expiryDate: '05/15/2025', action: 'N/A' },
    { name: 'Bank\nstatement', status: 'Need\nreview', expiryDate: 'N/A', action: 'Verify' },
    { name: "Driver's\nlicence", status: 'Pending', expiryDate: 'N/A', action: 'Upload\nnew photo' },
  ];

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
          <Text style={styles.headerTitle}>Document Managment</Text>
          <View style={styles.placeholder} />
        </View>
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload document</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>List of documents</Text>
            <ScrollView horizontal={true} style={styles.tableScrollView}>
              <View>
                <View style={styles.tableHeader}>
                  <Text style={[styles.columnHeader, styles.documentColumn]}>Document</Text>
                  <Text style={[styles.columnHeader, styles.statusColumn]}>Status</Text>
                  <Text style={[styles.columnHeader, styles.expiryColumn]}>Expiry date</Text>
                  <Text style={[styles.columnHeader, styles.actionColumn]}>Action</Text>
                </View>
                {documents.map((doc, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={[styles.cellText, styles.documentColumn]}>{doc.name}</Text>
                    <Text style={[styles.cellText, styles.statusColumn]}>{doc.status}</Text>
                    <Text style={[styles.cellText, styles.expiryColumn]}>{doc.expiryDate}</Text>
                    <TouchableOpacity style={styles.actionColumn}>
                      <Text style={[styles.cellText, styles.actionText]}>{doc.action}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
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
  headerIcon: {
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  uploadButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
  tableScrollView: {
    flexGrow: 0,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
    marginBottom: 10,
  },
  columnHeader: {
    fontWeight: 'bold',
    color: '#2C3E50',
    fontFamily: 'Poppins-Bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 10,
  },
  cellText: {
    color: '#2C3E50',
    fontFamily: 'Poppins-Regular',
  },
  documentColumn: {
    width: 100,
  },
  statusColumn: {
    width: 80,
  },
  expiryColumn: {
    width: 100,
  },
  actionColumn: {
    width: 120,
  },
  actionText: {
    color: '#007AFF',
    fontFamily: 'Poppins-Medium',
  },
});

export default DocumentManagement;