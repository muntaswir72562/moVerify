import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';
import Sidebar from '../../../components/sidebar';

interface LinkedService {
  name: string;
  permission: string;
  action: string;
}

const LinkedServices: React.FC = () => {
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

  const services: LinkedService[] = [
    { name: 'MCB', permission: 'Full-access', action: 'Revoke' },
    { name: 'Gov portal', permission: 'Read-only access', action: 'Manage' },
    { name: 'Amazon', permission: 'Full- access', action: 'Manage' },
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
          <Text style={styles.headerTitle}>Linked Services</Text>
          <View style={styles.placeholder} />
        </View>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkButtonText}>Link new service</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Linked services</Text>
          <ScrollView horizontal={true} style={styles.tableScrollView}>
            <View>
              <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, styles.serviceNameColumn]}>Service Name</Text>
                <Text style={[styles.headerCell, styles.permissionColumn]}>Permission Status</Text>
                <Text style={[styles.headerCell, styles.actionColumn]}>Action</Text>
              </View>
              {services.map((service, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.cell, styles.serviceNameColumn]}>{service.name}</Text>
                  <Text style={[styles.cell, styles.permissionColumn]}>{service.permission}</Text>
                  <TouchableOpacity style={styles.actionColumn}>
                    <Text style={styles.actionText}>[{service.action}]</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
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
  linkButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  linkButtonText: {
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
  headerCell: {
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
  cell: {
    color: '#2C3E50',
    fontFamily: 'Poppins-Regular',
  },
  serviceNameColumn: {
    width: 120,
  },
  permissionColumn: {
    width: 150,
  },
  actionColumn: {
    width: 100,
  },
  actionText: {
    color: '#007AFF',
    fontFamily: 'Poppins-Medium',
  },
});

export default LinkedServices;