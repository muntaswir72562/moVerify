import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  WithTimingConfig 
} from 'react-native-reanimated';
import Sidebar from '../../../components/sidebarAdmin';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'Verified' | 'Pending' | 'Failed';
  role: 'User' | 'Admin';
}

const UserManagement: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
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

  const users: User[] = [
    { id: '1', name: 'Darell', email: '---', status: 'Verified', role: 'User' },
    { id: '2', name: 'Wally', email: '---', status: 'Pending', role: 'Admin' },
    { id: '3', name: 'Faar', email: '---', status: 'Pending', role: 'User' },
    { id: '4', name: 'John', email: '---', status: 'Failed', role: 'User' },
  ];

  useEffect(() => {
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery]);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Verified': return 'green';
      case 'Pending': return 'orange';
      case 'Failed': return 'red';
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
          <Text style={styles.headerTitle}>User Management</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.searchAndButtonContainer}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#2C3E50" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.newUserButton}>
            <Text style={styles.newUserButtonText}>New User</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <ScrollView horizontal={true} style={styles.tableScrollView}>
            <View>
              <View style={styles.tableHeader}>
                <Text style={[styles.columnHeader, styles.nameColumn]}>Name</Text>
                <Text style={[styles.columnHeader, styles.emailColumn]}>Email</Text>
                <Text style={[styles.columnHeader, styles.statusColumn]}>Status</Text>
                <Text style={[styles.columnHeader, styles.roleColumn]}>Role</Text>
                <Text style={[styles.columnHeader, styles.actionColumn]}>Action</Text>
              </View>
              {filteredUsers.map((user, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.cellText, styles.nameColumn]}>{user.name}</Text>
                  <Text style={[styles.cellText, styles.emailColumn]}>{user.email}</Text>
                  <Text style={[styles.cellText, styles.statusColumn, { color: getStatusColor(user.status) }]}>
                    {user.status}
                  </Text>
                  <Text style={[styles.cellText, styles.roleColumn]}>{user.role}</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    height: 40,
    flex: 1,
    fontFamily: 'Poppins-Regular',
  },
  newUserButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  newUserButtonText: {
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
  emailColumn: {
    width: 100,
  },
  statusColumn: {
    width: 80,
  },
  roleColumn: {
    width: 80,
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

export default UserManagement;