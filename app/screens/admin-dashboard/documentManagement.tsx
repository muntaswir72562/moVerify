import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  WithTimingConfig 
} from 'react-native-reanimated';
import { Picker } from '@react-native-picker/picker';
import Sidebar from '../../../components/sidebarAdmin';

interface Document {
  id: string;
  name: string;
  status: 'Verified' | 'Rejected' | 'Pending';
  type: string;
}

const DocumentManagement: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
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

  const documents: Document[] = [
    { id: '1', name: 'wally', status: 'Verified', type: 'NIC' },
    { id: '2', name: 'Darell', status: 'Verified', type: 'Passport' },
    { id: '3', name: 'faar', status: 'Rejected', type: 'Utility bill' },
    { id: '4', name: 'Mun', status: 'Pending', type: 'Utility bill' },
  ];

  useEffect(() => {
    const filtered = documents.filter(doc => 
      (filterStatus === 'All' || doc.status === filterStatus) &&
      (filterType === 'All' || doc.type === filterType)
    );
    setFilteredDocuments(filtered);
  }, [filterStatus, filterType]);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Verified': return 'green';
      case 'Rejected': return 'red';
      case 'Pending': return 'orange';
      default: return '#2C3E50';
    }
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
          <Text style={styles.headerTitle}>Document Management</Text>
          <View style={styles.placeholder} />
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.filterContainer}>
            <View style={styles.filterItem}>
              <Text style={styles.filterLabel}>Filter by status:</Text>
              <Picker
                selectedValue={filterStatus}
                onValueChange={(itemValue) => setFilterStatus(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="All" value="All" />
                <Picker.Item label="Verified" value="Verified" />
                <Picker.Item label="Rejected" value="Rejected" />
                <Picker.Item label="Pending" value="Pending" />
              </Picker>
            </View>
            <View style={styles.filterItem}>
              <Text style={styles.filterLabel}>Filter by type:</Text>
              <Picker
                selectedValue={filterType}
                onValueChange={(itemValue) => setFilterType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="All" value="All" />
                <Picker.Item label="NIC" value="NIC" />
                <Picker.Item label="Passport" value="Passport" />
                <Picker.Item label="Utility bill" value="Utility bill" />
              </Picker>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>List of documents</Text>
            <ScrollView horizontal={true} style={styles.tableScrollView}>
              <View>
                <View style={styles.tableHeader}>
                  <Text style={[styles.columnHeader, styles.nameColumn]}>Name</Text>
                  <Text style={[styles.columnHeader, styles.statusColumn]}>Status</Text>
                  <Text style={[styles.columnHeader, styles.typeColumn]}>Type</Text>
                  <Text style={[styles.columnHeader, styles.actionColumn]}>Action</Text>
                </View>
                {filteredDocuments.map((doc, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={[styles.cellText, styles.nameColumn]}>{doc.name}</Text>
                    <Text style={[styles.cellText, styles.statusColumn, { color: getStatusColor(doc.status) }]}>
                      {doc.status}
                    </Text>
                    <Text style={[styles.cellText, styles.typeColumn]}>{doc.type}</Text>
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
  scrollView: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  filterItem: {
    flex: 1,
    marginRight: 10,
  },
  filterLabel: {
    fontSize: 14,
    color: '#2C3E50',
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
  },
  picker: {
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
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
  nameColumn: {
    width: 100,
  },
  statusColumn: {
    width: 100,
  },
  typeColumn: {
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

export default DocumentManagement;