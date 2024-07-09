import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  WithTimingConfig 
} from 'react-native-reanimated';
import Sidebar from '../../../components/sidebarAdmin';

interface Service {
  id: string;
  name: string;
  status: 'Active' | 'Inactive';
  date: string;
}

const Services: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
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

  const services: Service[] = [
    { id: '1', name: 'National ID', status: 'Active', date: '05/15/2025' },
    { id: '2', name: 'MCB', status: 'Active', date: '05/15/2025' },
    { id: '3', name: 'Passport', status: 'Inactive', date: '05/15/2025' },
    { id: '4', name: 'CWA', status: 'Inactive', date: '05/15/2025' },
  ];

  useEffect(() => {
    setFilteredServices(services);
  }, []);

  const getStatusColor = (status: string): string => {
    return status === 'Active' ? 'green' : 'red';
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
          <Text style={styles.headerTitle}>Linked Services</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.searchAndButtonContainer}>
          <TouchableOpacity style={styles.newServiceButton}>
            <Text style={styles.newServiceButtonText}>New Service</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <ScrollView horizontal={true} style={styles.tableScrollView}>
            <View>
              <View style={styles.tableHeader}>
                <Text style={[styles.columnHeader, styles.nameColumn]}>Name</Text>
                <Text style={[styles.columnHeader, styles.statusColumn]}>Status</Text>
                <Text style={[styles.columnHeader, styles.dateColumn]}>Date</Text>
                <Text style={[styles.columnHeader, styles.actionColumn]}>Action</Text>
              </View>
              {filteredServices.map((service, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.cellText, styles.nameColumn]}>{service.name}</Text>
                  <Text style={[styles.cellText, styles.statusColumn, { color: getStatusColor(service.status) }]}>
                    {service.status}
                  </Text>
                  <Text style={[styles.cellText, styles.dateColumn]}>{service.date}</Text>
                  <View style={styles.actionColumn}>
                    <TouchableOpacity style={styles.actionIcon}>
                      <Ionicons name="eye-outline" size={20} color="#2C3E50" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionIcon}>
                      <Ionicons name="create-outline" size={20} color="#2C3E50" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionIcon}>
                      <Ionicons name="trash-outline" size={20} color="#2C3E50" />
                    </TouchableOpacity>
                  </View>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
  searchAndButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  newServiceButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  newServiceButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  nameColumn: {
    width: 100,
  },
  statusColumn: {
    width: 80,
  },
  dateColumn: {
    width: 100,
  },
  actionColumn: {
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionIcon: {
    padding: 5,
  },
});

export default Services;